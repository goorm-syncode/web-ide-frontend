/**
 * 에러 메시지 매핑 유틸리티
 * 백엔드에서 내려주는 에러 코드 또는 메시지를 FEATURE_SPEC.md에 정의된 한국어 메시지로 변환합니다.
 */

const ERROR_MESSAGES = {
  // 공통 에러
  NETWORK_ERROR: '네트워크 연결 상태를 확인한 후 다시 시도해주세요.',
  SERVER_ERROR: '서버 처리 중 문제가 발생했습니다. 잠시 후 다시 시도해주세요.',
  BAD_REQUEST: '올바르지 않은 요청입니다.',
  
  // 로그인 관련
  LOGIN_FAILED: '이메일 또는 비밀번호가 올바르지 않습니다.',
  
  // 회원가입 관련
  EMAIL_ALREADY_EXISTS: '이미 사용 중인 이메일입니다.',
  NICKNAME_ALREADY_EXISTS: '이미 사용 중인 닉네임입니다.',
  SIGNUP_FAILED: '회원가입 처리 중 오류가 발생했습니다.',
  
  // 비밀번호 재설정 관련
  EMAIL_NOT_FOUND: '존재하지 않는 계정 정보입니다.',
};

/**
 * 에러 객체 또는 메시지를 입력받아 적절한 한국어 에러 메시지를 반환합니다.
 * @param {Error|Object|string} error 
 * @param {string} fallback 기본값
 * @returns {string} 가공된 에러 메시지
 */
export const mapErrorMessage = (error, fallback = '알 수 없는 오류가 발생했습니다.') => {
  if (!error) return fallback;

  // 1. 에러 응답 데이터 추출 (구조: { success, status, error: { code, message } })
  const responseData = error.response?.data;
  const status = error.response?.status;
  
  // 백엔드 명세에 따른 에러 코드 우선 추출
  const code = error.mappedMessage || responseData?.error?.code || responseData?.message || error.message;
  
  // 2. 특정 에러 코드/메시지 기반 매핑 (v1.0 API Spec 기준)
  const codeToMessage = {
    // Auth - Signup (중복 관련 상세 분리)
    'DUPLICATE_EMAIL': ERROR_MESSAGES.EMAIL_ALREADY_EXISTS,
    'EMAIL_ALREADY_EXISTS': ERROR_MESSAGES.EMAIL_ALREADY_EXISTS,
    'ALREADY_EXISTS_EMAIL': ERROR_MESSAGES.EMAIL_ALREADY_EXISTS,
    
    'DUPLICATE_NICKNAME': ERROR_MESSAGES.NICKNAME_ALREADY_EXISTS,
    'NICKNAME_ALREADY_EXISTS': ERROR_MESSAGES.NICKNAME_ALREADY_EXISTS,
    'ALREADY_EXISTS_NICKNAME': ERROR_MESSAGES.NICKNAME_ALREADY_EXISTS,

    // Auth - Login
    'INVALID_CREDENTIALS': ERROR_MESSAGES.LOGIN_FAILED,
    'USER_NOT_FOUND': ERROR_MESSAGES.LOGIN_FAILED,
    'INVALID_PASSWORD': ERROR_MESSAGES.LOGIN_FAILED,

    // Auth - Common
    'USER_NOT_FOUND_BY_EMAIL': ERROR_MESSAGES.EMAIL_NOT_FOUND,
  };

  if (codeToMessage[code]) return codeToMessage[code];
  
  // 네트워크 에러 처리
  if (code?.includes('Network Error') || error.message?.includes('Network Error')) {
    return ERROR_MESSAGES.NETWORK_ERROR;
  }

  // 3. HTTP 상태 코드별 기본 매핑
  if (status === 401) {
    if (code?.includes('login')) return ERROR_MESSAGES.LOGIN_FAILED;
    return '로그인이 필요하거나 세션이 만료되었습니다.';
  }
  if (status === 400) return ERROR_MESSAGES.BAD_REQUEST;
  if (status === 403) return '해당 작업에 대한 권한이 없습니다.';
  if (status === 404) return '정보를 찾을 수 없습니다.';
  if (status === 409) return '이미 가입된 이메일이거나 닉네임입니다.'; 
  if (status >= 500) return ERROR_MESSAGES.SERVER_ERROR;

  // 4. 추출된 메시지가 이미 한국어라면 그대로 사용, 아니면 fallback
  const isKorean = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/.test(code);
  if (isKorean && code !== '[object Object]') return code;

  return fallback;
};

export default ERROR_MESSAGES;
