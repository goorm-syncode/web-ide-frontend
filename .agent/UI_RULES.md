# UI Rules

이 문서는 프로젝트의 UI 스타일을 통일하기 위한 기준입니다.  
현재 단계에서는 인증 화면 및 공통 컴포넌트에 적용되는 스타일만 정의한다.

모든 화면과 컴포넌트는 아래 규칙을 반드시 따른다.

---

## 1. 디자인 방향

- 깔끔하고 모던한 SaaS 스타일
- 무채색 기반 + 포인트 컬러 1개만 사용
- 장식보다 가독성과 구조를 우선한다
- 과한 UI 효과 사용 금지

---

## 2. 컬러 팔레트

### Primary

- #6366F1
- hover: #4F46E5

---

### Text

- Primary: #22262B
- Secondary: #4B5563
- Muted: #8B95A1

---

### Background

- Page: #F5F5F5
- Card: #FFFFFF

---

### Border

- Default: #D1D5DB
- Soft: #E5E7EB

---

### Status

- Success: #34C759
- Warning: #E7C85C
- Error: #EF4444

---

## 3. Primary 컬러 사용 규칙

Primary 색상은 다음 경우에만 사용한다:

- 주요 CTA 버튼
- 선택 상태(active)
- 강조 요소

사용 금지:

- 페이지 배경
- 카드 배경
- 일반 텍스트
- 장식 요소

---

## 4. Spacing 규칙

다음 값만 사용한다:

4 / 8 / 12 / 16 / 24 / 32 / 48

---

## 5. Radius 규칙

- 6px
- 8px
- 12px

---

## 6. Border 규칙

- 1px solid #D1D5DB

---

## 7. Shadow 규칙

- 기본 상태에서는 사용하지 않는다
- hover 상태에서만 최소한으로 사용한다

---

## 8. Typography

- Font: Pretendard
- Size:
  - 28px (Page Title)
  - 20px (Section Title)
  - 16px (Card Title)
  - 14px (Body)
  - 12px (Caption)

---

## 9. 공통 컴포넌트 규칙

### Button

- height: 40px
- padding: 0 16px
- radius: 8px

---

### Input

- height: 40px
- padding: 0 12px
- radius: 8px
- error 상태와 helperText 표시를 지원한다

---

### Card

- padding: 16px
- radius: 12px

---

### MessageBox

- padding: 12px
- radius: 8px

---

## 10. 금지 규칙

다음 스타일은 사용하지 않는다:

- 그라데이션
- 글로우 / 네온 효과
- glassmorphism
- 불필요한 그림자
- 인라인 스타일 (style 속성)
- !important 사용
- 레이아웃 변동을 유발하는 동적 크기 변경 (CLS 방지)

---

## 11. UI 원칙

- 한 화면은 하나의 목적만 가진다
- 정보 계층을 명확하게 구성한다
- 포인트 컬러는 필요한 곳에만 사용한다
- 기존 컴포넌트 스타일을 유지한다

---

## 12. 컴포넌트 사용 규칙 (중요)

아래 컴포넌트만 공통 컴포넌트로 사용한다:

- Button
- Input
- Card
- MessageBox

규칙:

- 정의되지 않은 props를 임의로 추가하지 않는다
- 스타일 변경은 CSS에서만 수행한다
