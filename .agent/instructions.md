# Project Instructions (Frontend)

이 프로젝트는 Vite + React + JavaScript 기반의 프론트엔드 프로젝트입니다.

이 문서는 AI 에이전트 및 팀 공용 개발 지침입니다.  
기능 범위는 MVP_SCOPE.md를 기준으로 판단합니다.  
UI 스타일은 UI_RULES.md를 기준으로 반드시 통일합니다.

---

## 기술 기준

- Vite
- React
- JavaScript
- React Router
- Redux Toolkit
- Axios
- CSS (Tailwind, styled-components 사용 금지)
- ESLint + Prettier 사용

---

## 개발 원칙

- MVP 범위는 MVP_SCOPE.md를 기준으로 한다
- MVP 범위를 벗어나는 기능은 먼저 제안만 하고 바로 구현하지 않는다
- 복잡한 추상화보다 이해하기 쉬운 구조를 우선한다
- 코드와 구조는 최대한 단순하고 명확하게 유지한다
- 파일명과 컴포넌트명은 영문 사용, 컴포넌트는 PascalCase 사용
- 폴더 구조는 단순하게 유지하며 불필요한 계층 분리는 하지 않는다

---

## 폴더 구조 규칙

- 페이지는 `src/pages`에 작성한다
- 공통 컴포넌트는 `src/components/common`에 둔다
- 레이아웃 컴포넌트는 `src/components/layout`에 둔다
- API 호출 로직은 `src/services`에 정리한다
- 전역 상태는 `src/store`에 정리한다
- 스타일은 `src/styles`에서 관리한다

---

## UI 원칙 (중요)

- UI_RULES.md를 반드시 따른다
- 인증 화면은 중앙 카드 레이아웃을 사용한다
- 모든 화면은 일관된 spacing, typography, color 규칙을 유지한다

---

## UI 스타일 제한 (AI 방지 규칙)

- 무채색 기반 + Primary Indigo (#6366F1) 1개만 사용한다
- 과한 그라데이션, 글로우, 네온 효과를 사용하지 않는다
- glassmorphism 스타일을 사용하지 않는다
- 불필요한 장식 요소를 추가하지 않는다
- spacing은 4, 8, 12, 16, 24, 32, 48 단위만 사용한다
- radius, border, shadow는 UI_RULES 기준을 따른다
- 새로운 UI는 기존 화면과 동일한 톤과 간격을 유지한다

---

## 코드 작성 원칙

- 저장 시 Prettier 포맷 기준을 따른다
- ESLint 경고/에러를 최소화한다
- 불필요한 라이브러리를 추가하지 않는다
- 코드 구조는 직관적으로 작성한다 (과도한 abstraction 금지)
- 하드코딩된 문자열은 우선 허용하되 복잡해지면 상수 분리를 제안한다
- 인라인 스타일(style 속성)은 사용하지 않는다
- 모든 스타일은 CSS 파일에서 관리한다
- !important는 원칙적으로 사용하지 않는다

---

## 상태 관리 원칙

- Redux Toolkit을 사용한다
- 현재 단계에서는 auth slice만 우선 구현한다
- 불필요한 전역 상태는 만들지 않는다
- 단순 UI 상태는 useState 사용

---

## API 사용 원칙 (중요)

- 컴포넌트에서 axios 또는 fetch를 직접 사용하지 않는다
- 모든 API 호출은 반드시 src/services를 통해 수행한다
- 서비스 함수 호출 결과를 useState 또는 Redux에 저장하여 사용한다
- axios 인스턴스를 공통으로 사용한다

---

## 성능 기본 원칙 (중요)

- 레이아웃 이동(CLS)을 유발하는 UI 변경을 피한다
- 버튼, 입력창, 카드 등의 크기는 고정된 값으로 유지한다
- 이미지, 아이콘, 컴포넌트의 width/height를 명확히 지정한다
- 불필요한 리렌더링을 방지하기 위해 컴포넌트를 적절히 분리한다

---

## Git 협업 규칙

### Git Workflow 전략

- main: 최종 배포 브랜치
- develop: 개발 통합 브랜치
- feature/기능명: 기능 단위 작업 브랜치

---

### Git 운영 방식

- 각자 맡은 영역만 작업하여 파일 충돌을 최소화한다
- 작업은 반드시 feature 브랜치에서 진행한다
- 작업 완료 후 PR 생성
- PR merge는 리드가 담당한다
- 충돌 발생 시 작업자와 리드가 함께 해결한다

---

### Commit Message 컨벤션

- feat: 기능 구현
- fix: 버그 수정
- style: UI 및 스타일 수정
- refactor: 코드 구조 개선
- chore: 기타 작업

---

### PR 규칙

- 최소 1명 이상의 리뷰 필요
- PR 설명 작성 필수
- UI 변경 시 스크린샷 포함

---

### Merge 규칙

- 최종 merge는 리드만 수행한다
- 승인되지 않은 PR은 merge하지 않는다
- 직접 push는 금지한다

---

## 출력 방식 (AI 응답 규칙)

- 파일 변경 시 수정 파일 요약 먼저 제공
- 가장 단순하고 유지보수 쉬운 방안을 우선 제안
- 구현 전 구조를 먼저 제안
- 불필요한 복잡한 코드 생성 금지
