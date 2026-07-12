# 클라이언트에 노출된 API 키, 서버 라우트로 옮기기

## 문제

코드 리뷰에서 이런 지적을 받았다.

> Gemini API 키 클라이언트 노출 제거 — LLM 호출을 서버 라우트로 이동

`useGeminiChat.tsx`는 `"use client"` 훅이었고, 그 안에서 Gemini SDK를 직접 초기화하고 있었다.

```ts
"use client";

const generator = new GoogleGenerativeAI(
  process.env.NEXT_PUBLIC_GEMINI_API_KEY!
);
```

`NEXT_PUBLIC_` 접두사가 붙은 환경변수는 빌드 시점에 클라이언트 JS 번들에 그대로 삽입된다. 즉 배포된 사이트에 접속해서 개발자 도구로 번들 파일만 열어봐도 API 키를 그대로 복사해갈 수 있는 상태였다. 별도의 해킹 기법이 필요한 게 아니라, 그냥 페이지를 열기만 하면 노출되는 구조다.

## 해결 방향

키를 쓰는 코드를 브라우저에서 서버로 옮기면 된다. Next.js의 API 라우트(`src/app/api/**/route.ts`)는 항상 서버에서만 실행되고 클라이언트로 전송되지 않는다.

```
[Before] 브라우저 → Gemini API 직접 호출 (키가 브라우저 코드에 존재)
[After]  브라우저 → /api/gemini (서버) → Gemini API (키는 서버에만 존재)
```

### 서버 라우트 생성

```ts
// src/app/api/gemini/route.ts
export async function POST(request: NextRequest) {
  const { script } = await request.json();

  const generator = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
  const model = generator.getGenerativeModel({ model: "gemini-2.5-flash", ... });

  const result = await model.generateContent(script);
  return NextResponse.json({ response: result.response.text() });
}
```

`NEXT_PUBLIC_GEMINI_API_KEY` → `GEMINI_API_KEY`로 이름도 바꿨다. 접두사가 없으면 서버에서만 읽히고 클라이언트 번들에는 포함되지 않는다. 채팅 히스토리를 다루는 `askGeminiBot`용으로 `/api/gemini/chat` 라우트도 같은 방식으로 분리했다.

### 훅은 fetch만 하도록 축소

```ts
// src/hooks/useGeminiChat.tsx
const askGemini = async (script: string) => {
  setGeminiIsLoading(true);
  const res = await fetchData({
    path: "/api/gemini",
    body: { method: "POST", body: JSON.stringify({ script }) },
  });
  setGeminiIsLoading(false);
  return res.response;
};
```

훅에서 `@google/generative-ai` import가 사라졌다. 이제 브라우저는 Gemini의 존재 자체를 모른다.

키 이름을 바꾸는 것만으로는 부족했다. 기존 키는 이미 배포된 번들에 한 번 노출된 적이 있으므로, Google AI Studio에서 키 자체를 재발급했다. 이름만 가리는 건 보안 조치가 아니다.

## 옮기다가 발견한 버그들

라우트를 분리하는 과정에서 마주친 실수들. 기록해둔다.

**1. `route.ts`가 아니라 `routes.ts`로 만들었다**

Next.js App Router는 정확히 `route.ts`라는 파일명만 라우트 핸들러로 인식한다. 오타 하나로 `/api/gemini/chat`이 조용히 404가 났다.

**2. 라우트 핸들러 시그니처를 잘못 짰다**

```ts
// 잘못된 버전 — Request 객체를 그냥 구조분해
export async function POST({ chatHistory, newChat }: Props) { ... }

// 올바른 버전 — request.json()으로 파싱해야 함
export async function POST(request: NextRequest) {
  const { chatHistory, newChat } = await request.json();
  ...
}
```

**3. 응답을 이중으로 파싱했다**

공용 유틸 `fetchData`가 내부에서 이미 `response.json()`을 호출해 파싱된 객체를 반환하는데, 훅에서 그 결과에 다시 `.json()`을 호출했다. 이미 파싱된 일반 객체엔 `.json` 메서드가 없어서 런타임 `TypeError`가 났다.

**4. 요청 body 형태가 서버/클라이언트 간 안 맞았다**

클라이언트는 `JSON.stringify(script)`로 문자열 자체를 보내는데, 서버는 `const { script } = await request.json()`로 객체 프로퍼티를 기대하고 있었다. `{ script }`로 감싸서 맞췄다.

**5. 위 버그들이 전부 TypeScript 컴파일을 통과했다**

`fetchData`의 반환 타입이 `Promise<any>`였다 (`Response.json()`의 타입 자체가 `any`). 이 `any`가 훅의 반환 타입, 호출부까지 그대로 전염돼서 존재하지 않는 프로퍼티에 접근해도 컴파일 타임에 아무 에러가 안 났다. 전부 런타임에야 드러났다.

## 그런데 정작 진짜 버그는 "500 Internal Server Error"였다

위 네 가지를 다 고치고 나서도 `/api/gemini/chat`이 계속 500을 뱉었다. 그런데 브라우저 Network 탭엔 아무 정보가 없었다 — 응답 body가 완전히 비어 있었다.

원인은 라우트 핸들러에 `try/catch`가 없었던 것. Gemini SDK가 던지는 에러가 그대로 위로 튀어 올라가고, Next.js는 그걸 잡아서 body 없는 익명 500으로 바꿔버린다. 클라이언트 입장에선 "뭔가 터졌다"는 것 말고 아무 것도 알 수 없는 상태였다.

로컬에서 같은 요청을 직접 재현해서(`node -e`로 Gemini SDK를 그대로 호출) 진짜 에러 메시지를 뽑아봤다.

```
[GoogleGenerativeAI Error]: 404 Not Found
models/gemini-1.5-pro is not found for API version v1beta,
or is not supported for generateContent.
```

쓰고 있던 `gemini-1.5-pro` 모델이 이미 폐기된 상태였다. `gemini-2.5-flash`로 바꾸자 이번엔 다른 에러가 나왔다.

```
[GoogleGenerativeAI Error]: 429 Too Many Requests
Quota exceeded for metric: generate_content_free_tier_requests, limit: 20
```

무료 티어 하루 요청 한도(20회)를 이미 테스트하다 다 써버린 상태였다. 둘 다 "500이 왜 나는지" 코드만 봐서는 절대 알 수 없는, Gemini 쪽 응답 내용에만 있는 정보였다.

### 고친 방법 — 에러를 실제로 클라이언트까지 전달하기

`try/catch`를 걸어도 잡은 에러를 응답에 실어 보내지 않으면 의미가 없다. 서버, 클라이언트 양쪽을 다 고쳐야 했다.

**서버**: 잡은 에러를 로그로도 남기고, body에도 담아서 반환.

```ts
try {
  const result = await chat.sendMessage(newChat);
  return NextResponse.json({ response: result.response.text() });
} catch (e) {
  console.error(e); // 서버 콘솔 — 전체 스택트레이스
  const message = e instanceof Error ? e.message : "Unknown error";
  return NextResponse.json({ error: message }, { status: 502 }); // 클라이언트로 전달
}
```

**클라이언트**: `fetchData`가 실패 응답의 body를 아예 읽지 않고 있었다. 고정된 문자열만 던지느라 서버가 뭘 보내든 버려지고 있었던 것.

```ts
// Before
if (!response.ok) {
  throw new Error("호출 중 에러가 발생했습니다.");
}

// After
const data = await response.json();
if (!response.ok) {
  throw new Error(data.error ?? "호출 중 에러가 발생했습니다.");
}
```

이후로는 Network 탭 Response에서 바로 `429 Too Many Requests` 같은 실제 원인이 보인다. 서버 로그를 뒤지지 않아도 된다.

## 배운 점

- `NEXT_PUBLIC_` 접두사는 "공개해도 되는 값"에만 써야 한다. 비밀값에 실수로 붙이면 별도 취약점 스캔 없이 그냥 노출된다.
- 키를 재발급하지 않고 이름만 바꾸는 건 눈속임이다. 노출 이력이 있다면 값 자체를 교체해야 한다.
- 리팩토링 중 생긴 버그 대부분이 타입 체크를 통과했다. `any`가 한 군데만 섞여도 그 뒤로 이어지는 모든 코드의 타입 안전성이 사라진다는 걸 직접 겪었다.
- `try/catch`는 서버가 안 죽게 막아줄 뿐, 그 정보를 클라이언트로 넘기는 건 별개의 작업이다. 에러 핸들링은 "잡기"와 "전달하기" 두 단계가 다 있어야 완성된다는 걸 몸으로 배웠다.
- 다음 개선 과제로 `fetchData`에 제네릭을 씌워 응답 타입을 명시하는 작업을 남겨둔다.
