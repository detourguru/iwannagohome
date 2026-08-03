<div align="center">

# 나 집에 갈래! 🥺

[<img src="https://img.shields.io/badge/배포-iwgh.vercel.app-ffe236"/>](https://iwgh.vercel.app)

[<img src="https://img.shields.io/badge/프로젝트 기간-2024.10.25~2024.11.1-fab2ac?style=flat&logo=&logoColor=white" />]()
[<img src="https://img.shields.io/badge/리팩토링 기간-2026.07~2026.07-808080?style=flat&logo=&logoColor=white" />]()

</div>

## 📝 소개

AI 연인이 삐진 이유를 15턴 안에 찾아내는 채팅식 게임 웹앱 서비스입니다. 연인과 대화 방식이 서로 달라 다툰 경험이 있었던 사람들을 위해 개발 되었습니다. 대화 후 분석을 통해 따뜻하고 배려깊은 소통 방식을 연습할 수 있는 게임입니다.

원하는 상황을 선택 후 채팅 -> 분석하기로 지난 대화를 확인하고 AI 연인의 감정을 분석할 수 있습니다.

아이디어/디자인 참고: [명절 잔소리 마스터](https://holiday-jansori.vercel.app/)

### 화면 구성

|                                              /scene                                               |                                       /scene/{id}                                        |                                          /result                                           |
| :-----------------------------------------------------------------------------------------------: | :--------------------------------------------------------------------------------------: | :----------------------------------------------------------------------------------------: |
| ![main to scene](https://github.com/user-attachments/assets/a49c29a0-23d2-4ccc-b1c6-7f18506c8644) | ![chat](https://github.com/user-attachments/assets/4f4b0fed-e1d2-49e8-bb8b-eb5f254a0af4) | ![result](https://github.com/user-attachments/assets/1b91d10c-e95f-4c63-be69-0e41d0fe9543) |
|                           메인 페이지에서 상황 선택 화면으로 넘어갑니다                           |                          ai 연인와 채팅으로 소통하는 화면입니다                          |                             대화 완료 후 분석 결과 화면입니다                              |

<br />

## ⚙ 기술 스택

### Front-end

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Next JS](https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)

### Infra/DB

![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)
![Vercel](https://img.shields.io/badge/vercel-%23000000.svg?style=for-the-badge&logo=vercel&logoColor=white)

### Tools

![Figma](https://img.shields.io/badge/figma-%23F24E1E.svg?style=for-the-badge&logo=figma&logoColor=white)
![Notion](https://img.shields.io/badge/Notion-%23000000.svg?style=for-the-badge&logo=notion&logoColor=white)
![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)
![Playwright](https://img.shields.io/badge/-playwright-%232EAD33?style=for-the-badge&logo=playwright&logoColor=white)
<br />

## 🤔 기술적 이슈와 해결 과정 (2026)

> 2024년에 만든 토이 프로젝트를 다시 점검하고 고쳤습니다.

<details>
<summary>🤔 기술적 이슈와 해결 과정 (2024)</summary>
<div markdown="1">

- <b>input에 포커스 될 때 화면 줌인 되는 현상</b>:
  - 사용자 QA 단계에서 모바일 ios환경에서 테스트 시 폰트 사이즈가 16px 이하일 때 input에 포커스가 되면 자동으로 줌인되는 현상을 확인하여 수정했습니다.
  - [작업 커밋](https://github.com/detourguru/iwannagohome/commit/bae058aabad1e7006687f67aefc01508fcf786ba#diff-e133cd94910c5a9245ba6dcba68a64f7b3c736d18af7955fc6060f759ad2f760R28)
- <b>채팅 추가 시 자동 스크롤 오작동 이슈</b>:
  - 채팅이 추가되어도 자동으로 스크롤이 내려가지 않는 이슈를 확인 해 사용자 경험 개선을 위하여 항상 스크롤이 아래로 가도록 하는 커스텀 훅을 구현해 적용했습니다. 그러나 사용자가 이전 채팅 내용 확인을 위해 스크롤을 다시 올리더라도 자동으로 스크롤이 아래로 내려가는 이슈가 있었습니다. 그래서 chat history를 array로 받아 채팅에 새로운 요소가 추가될 때 자동스크롤을 구현하도록 수정되었습니다.
  - [작업 커밋](https://github.com/detourguru/iwannagohome/commit/b95670c28b4c7d4029ca4938d1c95231019fd66f)
    <br />

</div>
</details>

| 문제                                               | 원인                                                                                                                                 | 조치                                                                                                                                                  | 커밋                                                                                                  |
| -------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------- |
| LLM API 키가 클라이언트에 노출됨                   | `NEXT_PUBLIC_` 접두사 환경변수를 훅에서 직접 사용해 빌드 시 클라이언트 번들에 그대로 포함됨                                          | LLM 호출을 서버 API 라우트로 이동. 클라이언트는 서버 라우트만 호출하고, 키는 서버 전용 환경변수로 격리 (재발급 완료)                                  | [09488ad](https://github.com/detourguru/iwannagohome/commit/09488adc08f2197eaf969f65ca7b00291a387b1e) |
| 에러 리포팅 기능 자체가 크래시                     | 정의되지 않은 변수 참조 + 이미 소비된 `Request` 객체의 body를 재파싱 시도                                                            | 실제 HTTP 상태 코드를 파라미터로 전달하도록 수정, body는 caller에서 파싱한 값을 인자로 전달하는 방식으로 변경                                         | [e5f6975](https://github.com/detourguru/iwannagohome/commit/e5f69752fcac0d58a38df28a553c99b5765e7b5d) |
| POST 요청이 파싱 안 된 stream을 그대로 DB에 insert | `request.body`(ReadableStream)를 파싱 없이 그대로 사용                                                                               | `request.json()`으로 파싱 후 insert                                                                                                                   | [9fd3fbd](https://github.com/detourguru/iwannagohome/commit/9fd3fbdcaf736bbf7ca2e5511010dbfb29746b21) |
| API 실패 시 에러 상태가 화면까지 전파 안 됨        | 커스텀 fetch 훅이 에러를 삼키고 `data: null`만 반환해 이미 만들어둔 에러 UI가 렌더링될 기회 자체가 없었음                            | 훅이 `{ data, isLoading, error }` 형태로 에러 상태를 명시적으로 반환하도록 수정                                                                       | [4d4c703](https://github.com/detourguru/iwannagohome/commit/4d4c703146ef471f1c8d2360b6a286b4a27611d5) |
| 에러 리포팅 시스템 자체가 장애 지점이 될 수 있었음 | 로깅용 API 라우트(`/api/http`)가 실패하면 리포팅 함수가 같은 라우트를 다시 호출하는 구조라 DB 장애가 지속되면 재귀적으로 계속 호출됨 | 로깅 라우트의 실패는 `console.error`로 종결시키고, 재귀 호출 경로 자체를 제거                                                                         | [8f47f05](https://github.com/detourguru/iwannagohome/commit/8f47f058ea4b5f0f872eedc55adc04e5d78894a2) |
| API 라우트마다 에러 응답 형태가 제각각임           | `{ error }`, `{ message, status }` 등 라우트별로 다른 shape을 그때그때 만들어 반환.                                                  | 공통 `errorResponse(message, status)` 헬퍼와 `HttpError` 타입으로 모든 라우트의 에러 응답을 통일                                                      | [8f47f05](https://github.com/detourguru/iwannagohome/commit/8f47f058ea4b5f0f872eedc55adc04e5d78894a2) |
| 컴포넌트 안에 에러 리포팅 로직이 중복 구현됨       | `AnalyzeButton`이 공용 유틸을 쓰지 않고 같은 리포팅 payload를 인라인으로 재구현                                                      | 공용 `errorReport` 유틸이 서버 라우트뿐 아니라 클라이언트 컴포넌트에서도 재사용되도록 `Request` 객체 의존을 없애고 순수 파라미터를 받는 형태로 재설계 | [8f47f05](https://github.com/detourguru/iwannagohome/commit/8f47f058ea4b5f0f872eedc55adc04e5d78894a2) |

## 💁‍♂️ 프로젝트 팀원

|           Backend & Frontend            |
| :-------------------------------------: |
| [김채연](https://github.com/detourguru) |
