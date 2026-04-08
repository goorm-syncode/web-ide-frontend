/**
 * 에러 메시지 매핑 유틸리티
 * 백엔드에서 내려주는 에러 코드 또는 메시지를 FEATURE_SPEC.md에 정의된 한국어 메시지로 변환합니다.
 */

const ERROR_MESSAGES = {
  // 공통 에러
  NETWORK_ERROR: '네트워크 오류가 발생했습니다. 잠시 후 다시 시도해주세요.',
  SERVER_ERROR: '처리 중 문제가 발생했습니다.',
  
  // 로그인 관련
  LOGIN_FAILED: '이메일 또는 비밀번호가 올바르지 않습니다.',
  
  // 회원가입 관련
  EMAIL_ALREADY_EXISTS: '이미 사용 중인 이메일입니다.',
  NICKNAME_ALREADY_EXISTS: '이미 사용 중인 닉네임입니다.',
  
  // 비밀번호 재설정 관련
  EMAIL_NOT_FOUND: '등록되지 않은 이메일입니다.',
};

/**
 * 에러 객체 또는 메시지를 입력받아 적절한 한국어 에러 메시지를 반환합니다.
 * @param {Error|Object|string} error 
 * @param {string} fallback 기본값
 * @returns {string} 가공된 에러 메시지
 */
export const mapErrorMessage = (error, fallback = '알 수 없는 오류가 발생했습니다.') => {
  if (!error) return fallback;

  // error가 문자열인 경우
  if (typeof error === 'string') {
    return ERROR_MESSAGES[error] || error || fallback;
  }

  // Axios 에러 객체인 경우 (api.js에서 1차 가공됨)
  const message = error.message || (error.response?.data?.message);
  
  // 특정 키워드 매핑
  if (message?.includes('Network Error')) return ERROR_MESSAGES.NETWORK_ERROR;
  if (message === 'INVALID_CREDENTIALS' || message === 'USER_NOT_FOUND' || message === 'INVALID_PASSWORD') {
    return ERROR_MESSAGES.LOGIN_FAILED;
  }
  if (message === 'EMAIL_ALREADY_EXISTS') return ERROR_MESSAGES.EMAIL_ALREADY_EXISTS;
  if (message === 'NICKNAME_ALREADY_EXISTS') return ERROR_MESSAGES.NICKNAME_ALREADY_EXISTS;
  if (message === 'USER_NOT_FOUND_BY_EMAIL') return ERROR_MESSAGES.EMAIL_NOT_FOUND;

  return message || fallback;
};

export default ERROR_MESSAGES;
