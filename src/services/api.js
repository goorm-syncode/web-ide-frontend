import axios from 'axios';

/**
 * 전역 API 클라이언트 설정 (Axios)
 * 
 * - baseURL: 환경 변수 VITE_API_BASE_URL 사용
 * - 인증: localStorage의 accessToken을 Authorization Bearer 헤더에 자동 주입
 * - 응답: 공통 ApiResponse 형식 처리 및 에러 핸들링
 */

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://d1jum4zzr45u1b.cloudfront.net';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
  // openapi.json 내 별도 쿠키 인증 언급이 없으므로 false 유지
  withCredentials: false,
});

/**
 * 요청 인터셉터: 모든 요청에 토큰 자동 주입
 */
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

/**
 * 응답 인터셉터: 공통 응답 처리 및 에러 핸들링
 */
api.interceptors.response.use(
  (response) => {
    // 백엔드 ApiResponse 공통 포맷( { success, data, message } ) 대응
    // data 필드가 존재하면 해당 데이터를 반환, 없으면 전체 response 반환
    return response.data?.data !== undefined ? response.data.data : response.data;
  },
  (error) => {
    const errorResponse = error.response;
    let message = '알 수 없는 오류가 발생했습니다.';

    if (errorResponse) {
      // 401 Unauthorized: 토큰 만료 또는 인증 실패
      if (errorResponse.status === 401) {
        // TODO: 토큰 갱신(refresh) 로직 구현 필요 시 여기에 추가
        // 일단 토큰 삭제 및 로그인 유도 처리를 고려할 것
        console.warn('인증이 만료되었습니다. 로그인이 필요합니다.');
      }
      
      // 백엔드에서 내려주는 커스텀 메시지 우선 사용
      message = errorResponse.data?.message || message;
    } else if (error.request) {
      message = '서버 응답이 없습니다. 네트워크 상태를 확인해주세요.';
    }

    // 에러 객체에 가공된 메시지를 담아서 전달
    error.message = message;
    return Promise.reject(error);
  }
);

/**
 * 공통 에러 처리 유틸리티
 * 서비스 레이어에서 catch 시 사용 권장
 */
export const getErrorMessage = (error) => {
  return error.message || '요청 처리 중 오류가 발생했습니다.';
};

export default api;
