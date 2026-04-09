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

// 중복 리프레시 요청 방지를 위한 변수
let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

/**
 * 응답 인터셉터: 공통 응답 처리 및 에러 핸들링
 */
api.interceptors.response.use(
  (response) => {
    // 백엔드 ApiResponse 공통 포맷( { success, data, message } ) 대응
    return response.data?.data !== undefined ? response.data.data : response.data;
  },
  async (error) => {
    const originalRequest = error.config;
    const errorResponse = error.response;
    let message = '알 수 없는 오류가 발생했습니다.';

    if (errorResponse) {
      // 401 Unauthorized: 토큰 만료 또는 인증 실패
      if (errorResponse.status === 401 && !originalRequest._retry) {
        // 리프레시 토큰 요청 자체가 401이면 즉시 로그아웃
        if (originalRequest.url.includes('/api/auth/refresh')) {
          localStorage.removeItem('accessToken');
          localStorage.removeItem('refreshToken');
          window.location.href = '/login';
          return Promise.reject(error);
        }

        if (isRefreshing) {
          // 이미 리프레시 중이면 큐에 저장
          return new Promise((resolve, reject) => {
            failedQueue.push({ resolve, reject });
          })
            .then((token) => {
              originalRequest.headers.Authorization = `Bearer ${token}`;
              return api(originalRequest);
            })
            .catch((err) => Promise.reject(err));
        }

        originalRequest._retry = true;
        isRefreshing = true;

        const refreshToken = localStorage.getItem('refreshToken');
        if (!refreshToken) {
          // 리프레시 토큰이 없으면 로그아웃
          localStorage.removeItem('accessToken');
          window.location.href = '/login';
          return Promise.reject(error);
        }

        try {
          // 리프레시 토큰으로 새 토큰 발급 시도
          // 인터셉터 순환 방지를 위해 axios 직접 호출 고려하거나 별도 함수 사용
          // 여기서는 api 인스턴스를 직접 사용하되 위에서 /refresh 체크 로직이 있음
          const response = await axios.post(
            `${API_BASE_URL}/api/auth/refresh`,
            { refreshToken },
            { headers: { 'Content-Type': 'application/json' } }
          );

          const { accessToken, refreshToken: newRefreshToken } = response.data.data;

          // 토큰 저장
          localStorage.setItem('accessToken', accessToken);
          if (newRefreshToken) {
            localStorage.setItem('refreshToken', newRefreshToken);
          }

          // Redux Store 업데이트
          const { store } = await import('../store');
          const { updateToken } = await import('../store/slices/authSlice');
          store.dispatch(updateToken({ accessToken }));

          // 인증 헤더 갱신 후 원래 요청 재시도
          api.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
          originalRequest.headers.Authorization = `Bearer ${accessToken}`;

          processQueue(null, accessToken);
          return api(originalRequest);
        } catch (refreshError) {
          processQueue(refreshError, null);
          console.warn('인증이 만료되었습니다. 로그인이 필요합니다.');
          localStorage.removeItem('accessToken');
          localStorage.removeItem('refreshToken');
          window.location.href = '/login';
          return Promise.reject(refreshError);
        } finally {
          isRefreshing = false;
        }
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
