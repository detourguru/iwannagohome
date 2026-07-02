# 리팩토링 명세서

작성일: 2026-07-02
목적: 2년차 이직용 포트폴리오로 끌어올리기 위한 리팩토링 우선순위 정리 (구현은 본인이 진행)

---

## 0. 현재 수준 진단

**전반적으로 신입~1년차 수준.** "동작하는 코드"는 만들었지만 아래 세 가지가 부족해서 연차보다 낮게 보임:

1. **에러 경로가 검증되지 않음** — "에러 핸들링 추가"(d452cc7) 커밋이 있지만 실제로는 에러 리포팅 자체가 크래시하고 있었음 (아래 1-2). 기능을 만드는 것과 실제로 그 기능이 의도대로 동작하는지 확인하는 것의 차이.
2. **보안 감각** — LLM API 키를 클라이언트에서 직접 사용 (아래 1-1). 면접에서 나오면 오히려 감점 포인트.
3. **책임 분리 부족** — 컴포넌트가 fetch, 비즈니스 로직, 렌더링, 파싱을 다 들고 있음 (`AnalyzeButton.tsx`가 대표적).

반대로 커스텀 훅 분리 시도, `cva`로 variant 관리, TS strict 모드, Playwright E2E 테스트는 이 연차치고 잘한 시도. **"기초가 없다"가 아니라 "완성도/견고함이 부족하다"는 게 정확한 진단.**

---

## 1. 꼭 고치기 (Must Fix)

리뷰에서 실제로 확인된 버그 + 보안 이슈. 전부 실사용 시 실제로 터지는 문제들이라 우선순위 최상단.

### 1-1. Gemini API 키 클라이언트 노출 (보안, 최우선)
- **위치**: `src/hooks/useGeminiChat.tsx:21,54` — `process.env.NEXT_PUBLIC_GEMINI_API_KEY`
- **문제**: `NEXT_PUBLIC_` 접두사가 붙은 환경변수는 빌드 시 클라이언트 JS 번들에 그대로 박힘. 배포된 사이트의 devtools/view-source만 봐도 키가 노출됨 → 키 탈취, 쿼터 소진, 과금 위험.
- **조치**: LLM 호출을 서버 API 라우트로 옮기고, 클라이언트는 그 라우트만 호출. 키는 `ANTHROPIC_API_KEY`(NEXT_PUBLIC 접두사 없이)로 서버에서만 사용.
- **부가 조치**: 이미 노출됐던 Gemini 키는 재발급/폐기 권장 (배포 이력이 있다면 번들에 박혀 나갔을 가능성 있음).
- **블로그 소재**: "왜 LLM 키를 프론트에서 직접 쓰면 안 되는가" + BFF 패턴 도입기.

### 1-2. `errorReport`가 항상 크래시함 (에러 리포팅 기능 자체가 무력화)
- **위치**: `src/utils/errorReport.ts:7, 17`
- **문제 A (17번 줄)**: `status_code: status` — `status`라는 변수가 이 파일 어디에도 정의/import/파라미터로 존재하지 않음. 호출될 때마다 `ReferenceError: status is not defined`.
- **문제 B (7번 줄)**: `await request.json()`을 다시 호출. 호출부(`analyze/route.ts` 등)에서 이미 `await request.json()`을 한 번 읽은 동일 `Request` 객체를 넘기기 때문에, body 스트림이 이미 소비된 상태 → 두 번째 `.json()` 호출이 `TypeError: Body is unusable`로 던져짐.
- **영향**: Supabase insert가 실패해도 그 원인을 로깅하는 `errorReport` 자체가 크래시하기 때문에, 원래 에러가 통째로 묻힘. "에러 핸들링 추가" 커밋의 실효성이 없었던 근본 원인.
- **조치**: `status`를 실제 HTTP 상태 코드로 교체(파라미터로 받거나 caller에서 넘기기), `request.json()`은 caller에서 이미 파싱한 `req` 객체를 인자로 넘겨받는 방식으로 변경 (Request 객체 자체를 넘기지 말 것).

### 1-3. `scene/[id]` POST가 파싱 안 된 stream을 그대로 insert
- **위치**: `src/app/api/scene/[id]/route.ts:23`
- **문제**: `supabase.from("chat").insert(request.body)` — `request.body`는 `ReadableStream`이지 파싱된 JSON이 아님. `await request.json()`으로 파싱해야 함.
- **영향**: 이 라우트로 POST하면 insert가 실패하거나 의도치 않은 데이터가 들어감.

### 1-4. `useFetchData`가 에러를 통째로 삼킴
- **위치**: `src/hooks/useFetchData.tsx:16-27`
- **문제**: fetch 실패 시 `return NextResponse.json(...)`을 하는데, `NextResponse`는 서버 전용 API라 클라이언트 컴포넌트에서 호출해도 의미 없는 값이고, 이 return 값 자체가 훅의 반환값(`data`, `isLoading`)에 전혀 반영되지 않음. 결과적으로 API가 실패하면 `data`는 `null`로 남고 `isLoading`만 `false`가 됨.
- **영향**: 페이지들이 대부분 `data && (...)` 패턴으로 렌더링하기 때문에, API 실패 시 이미 만들어둔 `error.tsx`/`not-found.tsx`가 전혀 안 보이고 그냥 빈 화면만 뜸.
- **조치**: 훅이 `{ data, isLoading, error }` 형태로 에러 상태를 반환하도록 수정하고, 페이지에서 에러 시 명시적으로 에러 UI를 렌더링.

### 1-5. Gemini → Claude 마이그레이션 (아키텍처 변경 포함)
결정된 방향 (앞서 확인함):
- **호출 위치**: 클라이언트 훅에서 SDK 직접 호출 → **서버 API 라우트**(`/api/chat`, `/api/chat/analyze` 등, 기존 `/api/analyze`와 이름 겹치지 않게 네이밍 주의)로 이동. 1-1과 동시에 해결됨.
- **분석 결과 구조화**: 현재 `AnalyzeButton.tsx:27-28`에서 ` ```json ` 문자열을 `replaceAll`로 벗겨내고 `JSON.parse`하는 방식(이미 본인이 `// TODO: 재시도 할 수 있는 방법 고민` 주석을 남겨둔 부분) → **Claude의 tool use**로 JSON 스키마를 강제해서 파싱 실패 가능성 자체를 제거.
- **메시지 포맷**: Gemini의 `{ role, parts: [{ text }] }` 구조를 Claude의 `{ role: "user" | "assistant", content: string }` 구조로 변경 (`src/type/common.ts`의 `GeminiChatHistoryType`, `ChatCard.tsx`, `useHandleChatEvent.tsx`, `RESULT_SCRIPT` 등 관련 코드 전부 영향받음).
- **시스템 프롬프트**: 현재 `baseStory.personality`를 가짜 "user" 턴으로 history에 끼워 넣는 방식 → Claude의 `system` 파라미터로 분리해서 넘기는 게 정석. `story_info.init`은 history의 첫 assistant 메시지로만 남기면 됨.
- **패키지**: `@google/generative-ai` 제거, `@anthropic-ai/sdk` 추가. `NEXT_PUBLIC_GEMINI_API_KEY` → `ANTHROPIC_API_KEY`(서버 전용).

---

## 2. 시간되면 고치기 (Nice to have)

포트폴리오 완성도와 블로그/면접 소재로서의 가치는 있지만, 서비스가 당장 깨지는 문제는 아닌 것들.

1. **데이터 페칭 레이어를 React Query/SWR로 교체** — 지금 `useFetchData`는 캐싱, 재시도, race condition 처리가 전혀 없는 자체 구현. "직접 만들다 겪은 한계 → 라이브러리 선택 이유"가 좋은 블로그 소재.
2. **컴포넌트 책임 분리** — `AnalyzeButton.tsx`가 LLM 호출 + JSON 파싱 + DB insert + 라우팅을 전부 컴포넌트 안에서 처리 중. 커스텀 훅/서비스 함수로 추출.
3. **API 응답 포맷 표준화** — 지금 라우트마다 `{ error }`, `{ message, status, data }`, `{ error, status, data }` 등 응답 shape이 제각각. 공통 응답 헬퍼로 통일.
4. **단위 테스트 추가** — 현재 Playwright E2E만 존재. 훅/유틸 단위로 Vitest 등 도입.
5. **E2E 테스트의 `setTimeout` 대기 제거** — `tests/scene.spec.ts:135` 등에서 `new Promise((resolve) => setTimeout(resolve, 3000))`로 임의 대기 중. `page.waitForResponse()` 등 이벤트 기반 대기로 교체하면 플레이키니스 감소.
6. **`chatId` 생성 위치** — `src/app/scene/[id]/page.tsx:20`의 `const chatId = v4();`가 컴포넌트 렌더 함수 안에 있어서 리렌더마다 새 UUID가 생성됨(현재는 같은 렌더 내에서 일관되게 쓰여서 실제 버그로 이어지진 않지만, 렌더링은 순수해야 한다는 원칙 위반이며 React Strict Mode 이중 렌더링 시 혼란의 소지가 있음). `useState(() => v4())`나 `useMemo`로 고정.
7. **환경변수 정리** — 마이그레이션 후 안 쓰는 `NEXT_PUBLIC_GEMINI_API_KEY` 제거.

---

## 참고: 각 항목이 면접/블로그에서 쓸 수 있는 각도

- 1-1 + 1-5: "AI 기능이 있는 프론트엔드에서 API 키를 안전하게 다루는 법 (BFF 패턴)"
- 1-2: "에러 핸들링을 추가했는데 왜 안 잡혔을까 — 에러 처리 코드도 테스트가 필요한 이유"
- 1-4: "에러 상태를 UI까지 제대로 전파하기 — 로딩/에러/빈 상태를 구분해서 설계하기"
- 1-5 (tool use): "LLM 응답을 신뢰성 있게 구조화하기 — 문자열 파싱에서 tool use로"
- 2-1: "직접 만든 fetch 훅의 한계와 React Query로의 전환기"
