# Frontend API Guide

## Stack

- Vite
- React
- JavaScript
- Axios

## API Rules

- 모든 API 호출은 src/services 하위에서만 처리
- 컴포넌트 내부에서 직접 axios 호출 금지
- 공통 axios 인스턴스 사용
- baseURL은 import.meta.env.VITE_API_BASE_URL 사용
- 인증 토큰은 Authorization Bearer 방식 우선 적용
- 문서상 불명확한 부분은 임의 추정하지 말고 TODO 처리

## Priority

1. auth
2. users/me
3. missions list
4. mission detail
5. progress
6. continue mission
7. submission / run / test

## UI Rules

- 기존 페이지 UI는 최대한 유지
- loading / error 상태 추가
- 실패 메시지는 사용자에게 표시
