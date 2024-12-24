<div align="center">

# 나 집에 갈래! 🥺
[<img src="https://img.shields.io/badge/배포-iwgh.vercel.app-ffe236"/>](https://iwgh.vercel.app)
[<img src="https://img.shields.io/badge/프로젝트 상세-grey?style=flat&logo=notion"/>](https://simplistic-fowl-e8b.notion.site/129c24368b5380339c10ebe280d3a34b?pvs=74)

[<img src="https://img.shields.io/badge/프로젝트 기간-2024.10.25~2024.11.1-fab2ac?style=flat&logo=&logoColor=white" />]()
</div> 

## 배포 링크
https://iwgh.vercel.app/


## 시작하기
```bash
npm run dev
```


## 미리보기
https://github.com/user-attachments/assets/5e207cfc-2361-48f4-9aa6-f45adfe72866


## 프로젝트 상세
[https://simplistic-fowl-e8b.notion.site/124c24368b5380dd80ceff55e28cb067](https://simplistic-fowl-e8b.notion.site/129c24368b5380339c10ebe280d3a34b)


## 📝 소개
AI 연인이 삐진 이유를 15턴 안에 찾아내는 채팅식 게임 웹앱 서비스입니다. 

따뜻하고 배려깊은 소통 방식 연습할 수 있는 게임으로, 연인과‬‭ 대화‬‭ 방식이‬‭ 서로‬‭ 달라‬‭ 다툰‬‭ 경험이‬‭ 있었던‬‭ 사람들을‬‭ 위해 개발 되었습니다.‭

원하는 상황을 선택 후 채팅 -> 분석하기로 지난 대화를 확인하고 AI 연인의 감정을 분석할 수 있습니다.


아이디어/디자인 참고: [명절 잔소리 마스터](https://holiday-jansori.vercel.app/)

### 화면 구성
|/scene|/scene/{id}|/result|
|:---:|:---:|:---:|
|![main to scene](https://github.com/user-attachments/assets/a49c29a0-23d2-4ccc-b1c6-7f18506c8644)|![chat](https://github.com/user-attachments/assets/4f4b0fed-e1d2-49e8-bb8b-eb5f254a0af4)|![result](https://github.com/user-attachments/assets/1b91d10c-e95f-4c63-be69-0e41d0fe9543)|
|메인 페이지에서 상황 선택 화면으로 넘어갑니다|ai 연인와 채팅으로 소통하는 화면입니다|대화 완료 후 분석 결과 화면입니다|
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
<br />


## 🤔 기술적 이슈와 해결 과정
- input에 포커스 될 때 화면 줌인 되는 현상:
  - 사용자 QA 단계에서 모바일 ios환경에서 테스트 시 폰트 사이즈가 16px 이하일 때 input에 포커스가 되면 자동으로 줌인되는 현상을 확인하여 수정했습니다.
  - [작업 커밋](https://github.com/detourguru/iwannagohome/commit/bae058aabad1e7006687f67aefc01508fcf786ba#diff-e133cd94910c5a9245ba6dcba68a64f7b3c736d18af7955fc6060f759ad2f760R28)
- 채팅이 추가될 때 화면이 내려가지 않는 이슈:
  - 채팅이 추가되어도 자동으로 스크롤이 내려가지 않는 이슈를 확인 해 사용자 경험 개선을 위하여 항상 스크롤이 아래로 가도록 하는 커스텀 훅을 구현해 적용했습니다. 그러나 사용자가 이전 채팅 내용 확인을 위해 스크롤을 다시 올리더라도 자동으로 스크롤이 아래로 내려가는 이슈가 있었습니다. 그래서 chat history를 array로 받아 채팅에 새로운 요소가 추가될 때 자동스크롤을 구현하도록 수정되었습니다.
  - [작업 커밋](https://github.com/detourguru/iwannagohome/commit/b95670c28b4c7d4029ca4938d1c95231019fd66f)
<br />


## 💁‍♂️ 프로젝트 팀원
|Backend & Frontend|
|:---:|
|[김채연](https://github.com/detourguru)|
