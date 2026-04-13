# Web IDE Frontend 🚀

학습형 웹 IDE 플랫폼의 프론트엔드 애플리케이션 저장소입니다.  
사용자가 미션을 탐색하고, 브라우저 환경에서 실시간으로 코드를 작성, 실행 및 제출할 수 있는 통합 개발 환경을 제공합니다.

- **데모 서비스 URL**: [https://d3mpsqo9lnx0wo.cloudfront.net](https://d3mpsqo9lnx0wo.cloudfront.net)

## 데모 계정

테스트용 계정으로 아래 정보를 사용할 수 있습니다.

- Email: `user@example.com`
- Password: `Password123!`

## 💡 주요 기능

- **인증 및 계정**: JWT 기반 보안 인증, 회원가입/로그인, 비밀번호 재설정
- **미션 탐색**: 난이도, 상태, 키워드 기반의 고도화된 필터링 및 페이지네이션
- **학습 진행률**: RunCat 스타일의 애니메이션 배너를 통한 직관적인 진행도 표시 및 이어하기 기능
- **Web IDE**: Monaco Editor 기반의 강력한 코드 편집, 실시간 코드 실행 및 테스트 케이스 검사
- **실시간 소통**: SSE(Server-Sent Events)를 활용한 실시간 알림 및 채팅 위젯
- **개발 생산성**: `/dev/*` 경로를 통한 UI 컴포넌트 독립 검증 환경 제공

## 🛠 기술 스택

### 핵심 프레임워크 & 라이브러리

- **React 19**: 최신 Concurrent 기능을 활용한 고성능 UI 구현
- **Vite 8**: 초고속 개발 및 빌드 환경 구성
- **React Router DOM 7**: 선언적 라우팅 및 데이터 로딩 처리
- **Redux Toolkit**: 중앙 집중식 상태 관리 및 비동기 로직 제어

### 통신 & 실시간 처리

- **Axios**: 인터셉터를 통한 인증 토큰 통합 관리 및 API 통신
- **SSE (Server-Sent Events)**: 서버와의 실시간 단방향 통신 알림 구현

### 개발 도구

- **Monaco Editor**: VS Code 엔진 기반의 고도화된 코드 편집 환경
- **ESLint & Prettier**: 코드 품질 유지 및 일관된 스타일링
- **Husky & Lint-staged**: 커밋 전 코드 검사 자동화

## 🖥 개발 및 실행 환경

- **Node.js**: v24.x (권장)
- **Package Manager**: npm

## 시작 방법

```bash
npm install
npm run dev
```

개발 서버 실행 후 브라우저에서 로컬 Vite 주소로 접속할 수 있습니다.

## 사용 가능한 스크립트

```bash
npm run dev
npm run build
npm run preview
npm run lint
npm run lint:fix
npm run format
npm run format:check
```

- `npm run dev`: 개발 서버 실행
- `npm run build`: 프로덕션 빌드 생성
- `npm run preview`: 빌드 결과 로컬 미리보기
- `npm run lint`: ESLint 검사
- `npm run lint:fix`: ESLint 자동 수정
- `npm run format`: Prettier 포맷 적용
- `npm run format:check`: Prettier 포맷 검사

## ⌨️ 키보드 단축키 (Mission Page)

더 효율적인 코드 작성을 위해 다음과 같은 단축키를 지원합니다. (macOS 환경은 `Ctrl` 대신 `Cmd` 사용)

| 기능       | 단축키                 | 설명                                                |
| :--------- | :--------------------- | :-------------------------------------------------- |
| **저장**   | `Ctrl + S`             | 현재 작성 중인 코드를 드래그 저장소에 보관합니다.   |
| **실행**   | `Ctrl + Enter`         | 코드를 테스트 케이스와 함께 실행합니다.             |
| **제출**   | `Ctrl + Shift + Enter` | 코드를 최종 제출하고 채점 결과 확인을 요청합니다.   |
| **초기화** | `Ctrl + Shift + R`     | 코드를 문제의 초기 상태(Starter Code)로 되돌립니다. |

## ⚙️ 환경 변수 설정

이 프로젝트는 Vite의 환경 변수 시스템을 사용합니다. 프로젝트 루트에 `.env` 파일을 생성하고 설정하십시오.

```env
# 백엔드 API 및 SSE 연결의 기준 URL
VITE_API_BASE_URL=https://api.your-domain.com
```

> [!TIP]
> 자세한 설정 예시는 [.env.example](./.env.example) 파일을 참고하세요.

## 🛣 라우트 구조

### 메인 서비스 라우트

- `/`: 인증 상태에 따른 자동 리다이렉트
- `/home`: 미션 목록, 진행률 대시보드 (인증 필요)
- `/login` / `/signup`: 인증 관련 페이지
- `/missions/:missionId`: 웹 IDE 통합 화면 (인증 필요)
- `/reset-password`: 비밀번호 재설정 관련

### 개발 지원 라우트 (`/dev/*`)

컴포넌트 단위의 빠르고 독립적인 검증을 위해 제공됩니다.

- `/dev/home`, `/dev/problem-list`, `/dev/chat-widget` 등

## 📦 프로젝트 구조

```bash
src/
├── assets/            # 이미지, 스프라이트(cat.png) 등 정적 리소스
├── components/        # 공통(UI, Layout) 및 도메인(Mission, Chat) 컴포넌트
├── context/           # React Context API 활용 전역 관리
├── hooks/             # useDraggable, useResizable 등 커스텀 훅
├── pages/             # 라우트 단위 페이지 컴포넌트
├── services/          # API 통신(Axios), SSE(Chat), 에러 매핑 로직
├── store/             # Redux Toolkit 기반 전역 상태 관리
└── styles/            # Vanilla CSS 및 테마 색상 변수 관리
```

## 🔄 CI/CD 및 배포

프로젝트의 품질 관리와 자동화된 배포를 위해 GitHub Actions를 사용합니다.

- **CI**: 모든 PR에 대해 ESLint와 Prettier 검사를 실행하여 코드 품질을 보장합니다. ([ci.yml](./.github/workflows/ci.yml))
- **Deployment**: `develop` 브랜치에 푸시될 경우 AWS CloudFront로 자동 배포가 수행됩니다. ([deploy-dev.yml](./.github/workflows/deploy-dev.yml))

## 인증 및 상태 관리

이 프로젝트는 Redux Toolkit 기반으로 인증 상태를 관리합니다.

- 인증 상태는 Redux store에서 관리합니다.
- Access Token, Refresh Token은 브라우저 저장소를 사용합니다.
- Axios 인터셉터를 통해 요청 시 Authorization 헤더를 자동 주입합니다.
- Access Token 만료가 임박하면 선제적으로 갱신을 시도합니다.
- 401 응답 발생 시 Refresh Token을 사용해 토큰 재발급을 시도합니다.
- 재발급 실패 시 세션 만료 처리 후 로그인 흐름으로 유도합니다.

## API 통신 방식

- 공통 API 클라이언트는 Axios 기반으로 구성되어 있습니다.
- 백엔드 공통 응답 포맷을 기준으로 응답 데이터를 정리합니다.
- 서비스별 API 호출은 `src/services` 아래에 분리되어 있습니다.
- 채팅 구독은 SSE 기반으로 처리하며, 인증 토큰 갱신 흐름과 연동됩니다.

## 화면 구성

### 홈 화면

- GNB
- 학습 진행률 배너
- 미션 검색 및 필터
- 미션 목록
- 페이지네이션
- 로그인 상태일 경우 채팅 위젯

### 미션 상세 화면

- 문제 설명 패널
- 코드 에디터
- 실행 결과 패널
- 코드 저장, 실행, 제출 기능
- 모바일 대응 레이아웃

## 개발 가이드

### 디렉터리 사용 원칙

- 페이지 단위 화면은 `src/pages`
- 재사용 가능한 UI는 `src/components`
- API 호출과 네트워크 로직은 `src/services`
- 전역 상태는 `src/store`
- 스타일은 `src/styles`

### 개발 시 참고 사항

- 새로운 API 연동은 가능한 한 `services/` 계층에 추가합니다.
- 라우트 추가 시 `src/router`에서 관리합니다.
- 인증이 필요한 페이지는 가드 처리 여부를 함께 확인합니다.
- 공통 컴포넌트는 `/dev/*` 페이지를 활용해 먼저 검증할 수 있습니다.

## 브랜치 전략

브랜치는 작업 성격이 드러나도록 작성하는 것을 권장합니다.

예시:

```bash
feature/login-api
feature/mission-editor
fix/token-refresh
refactor/home-filters
docs/readme-update
```

권장 접두사는 다음과 같습니다.

- `feature/`: 기능 추가
- `fix/`: 버그 수정
- `refactor/`: 리팩터링
- `docs/`: 문서 작업
- `chore/`: 설정, 빌드, 의존성 등 기타 작업

## 커밋 메시지 규칙

커밋 메시지는 변경 의도를 짧고 명확하게 작성합니다.

예시:

```bash
feat: add mission search filter
fix: handle expired token on sse reconnect
refactor: split mission page panel logic
docs: expand project readme
style: format home page styles
chore: update eslint config
```

권장 타입은 다음과 같습니다.

- `feat`: 기능 추가
- `fix`: 버그 수정
- `refactor`: 리팩터링
- `docs`: 문서 수정
- `style`: 포맷 및 스타일 수정
- `test`: 테스트 관련 작업
- `chore`: 기타 유지보수 작업

## PR 규칙

PR은 리뷰어가 빠르게 이해할 수 있도록 작성합니다.

### PR 제목 예시

```bash
[feature] 미션 상세 페이지 에디터 저장 기능 추가
[fix] 토큰 만료 시 채팅 SSE 재연결 문제 수정
[docs] README 구조 전면 개편
```

### PR 본문에 포함하면 좋은 항목

- 변경 목적
- 주요 변경 사항
- 확인이 필요한 부분
- 테스트 방법
- UI 변경 시 스크린샷

예시:

## 변경 목적

미션 상세 화면에서 코드 임시 저장 기능을 안정화하기 위해 수정했습니다.

## 주요 변경 사항

- 저장 API 호출 시 언어 매핑 로직 수정
- 저장 완료 후 로컬 상태 동기화 처리
- 저장 중 중복 요청 방지

## 테스트 방법

- 미션 상세 페이지 진입
- 코드 수정 후 저장 실행
- 새로고침 후 저장 내용 유지 확인
