# devfive front system

데브파이브 프론트 시스템은 더 빠른 개발 환경을 구축하기 위하여 만들어진 템플릿 입니다.

## 핵심 라이브러리

- vite - 프론트엔드 빌드 번들러
- emotion - css in js 구현
- chakra-ui - css in js 고도화
- axios - 리퀘스트
- swr - 리퀴스트 고도화
- eslint - 코드 품질 유지
- prettier - 코드 품질 유지
- zustand - 글로벌 저장소
- antd - Antd 디자인
- react-router-dom - 클라이언트 사이드 라우팅

## 프로젝트 구조

- src - 소스 폴더
    - components - 컴포넌트
    - hooks - 리액트 훅
    - interfaces - 데이터 인터페이스
    - pages - 페이지(페이지는 컴포넌트로 구성)
    - routes - 라우트(라우트에서 페이지로 연결)
    - store - zustand 글로벌 저장소
    - stories - storybook에 표기되는 components
    - theme - 테마
    - utils - 유틸리티
    - fetcher - swr에 필요한 fetcher 모음
- index.html - 원본 html

## 환경 변수

- `.env.development` : development 환경 변수
- `.env.production` : production 환경 변수

### 세부 환경 변수

- `VITE_BASE_URL` : axios base url을 설정
- `VITE_TITLE` : 웹 사이트 타이틀
- `VITE_OWNER` : 웹 사이트 소유자
- `VITE_EMAIL` : 웹 사이트 이메일
- `VITE_AUTH_HEADER` : 인증 헤더
- `VITE_PRINT_DEVFIVE` : 데브파이브 로고 출력 여부
- `VITE_PRINT_ENV` : 환경 출력 여부
- `VITE_LOGOUT_TIME` : 로그아웃 시간(초)
- `VITE_LOGOUT_MODAL_MSG` : 로그아웃 모달 메시지

## 시작 방법

개발과 상용의 차이는 `.env` 환경변수 파일의 차이입니다.

### `npm login --registry=https://npm.pkg.github.com --auth-type=legacy --scope=@dev-five-git`

devfive npm registry에 로그인 합니다.  
`front-components` 라이브러리를 사용하기 위해서는 로그인이 필요합니다.  
github id와 personal access token을 입력합니다.  
만약 정상적으로 로그인이 되지 않는다면, `npm i -g npm` 명령어로 npm을 업데이트 해주세요.

### `pnpm install`

필요한 라이브러리를 설치한다.

### `pnpm start`

개발 서버를 실행한다.

### `pnpm start:prod`

상용 서버를 실행한다.

### `pnpm build`

상용 앱을 빌드한다.

### `pnpm build:dev`

개발 앱을 빌드한다.

