import axios from 'axios';

/**
 * 전역 API 클라이언트 설정 (Axios)
 * 
 * - baseURL: 환경 변수 VITE_API_BASE_URL 사용
 * - 인증: localStorage의 accessToken을 Authorization Bearer 헤더에 자동 주입
 * - 응답: 공통 ApiResponse 형식 처리 및 에러 핸들링
 * - 선제적 갱신: 요청 직전 토큰 만료 1분 미만 시 미리 갱신 시도
 */

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://d1jum4zzr45u1b.cloudfront.net';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: false,
});

/**
 * localStorage의 accessToken JWT를 파싱하여 만료까지 남은 시간(초)을 반환합니다.
 * 로컬 시계 기준이므로 서버 시간과 오차가 있을 수 있습니다.
 * (이 함수는 선제적 갱신을 위한 힌트로만 사용하며, 실제 인증은 서버가 판단합니다.)
 * @returns {number} 만료까지 남은 초 (파싱 실패 시 Infinity)
 */
export const getTokenRemainingSeconds = () => {
  try {
    const token = localStorage.getItem('accessToken');
    if (!token) return 0;

    const payloadBase64 = token.split('.')[1];
    if (!payloadBase64) return 0;

    const payload = JSON.parse(atob(payloadBase64));
    if (!payload.exp) return Infinity;

    const remainingSeconds = payload.exp - Math.floor(Date.now() / 1000);
    return remainingSeconds;
  } catch {
    return Infinity;
  }
};

/**
 * 세션 만료 처리 유틸 함수
 * - localStorage 토큰 제거
 * - 'auth:session-expired' CustomEvent 발행 (MessageBox 표시용)
 * - 직접 window.location 이동은 MessageBox 확인 후 렌더 레이어가 처리
 */
const notifySessionExpired = () => {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
  window.dispatchEvent(new CustomEvent('auth:session-expired'));
};

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
 * 전역 토큰 갱신 처리 함수
 * 401 에러 발생 시 Axios 인터셉터 및 SSE(fetch) 구독 로직에서 공통 사용
 * @returns {Promise<string>} 새 accessToken
 */
export const handleTokenRefresh = async () => {
  if (isRefreshing) {
    return new Promise((resolve, reject) => {
      failedQueue.push({ resolve, reject });
    });
  }

  isRefreshing = true;
  const refreshToken = localStorage.getItem('refreshToken');

  if (!refreshToken) {
    isRefreshing = false;
    notifySessionExpired();
    throw new Error('No refresh token available');
  }

  try {
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

    // Redux Store 업데이트 (동적 임포트로 순환 참조 방지)
    const { store } = await import('../store');
    const { updateToken } = await import('../store/slices/authSlice');
    store.dispatch(updateToken({ accessToken }));

    processQueue(null, accessToken);
    return accessToken;
  } catch (refreshError) {
    processQueue(refreshError, null);
    // Refresh Token 만료 또는 유효하지 않은 경우 → 세션 만료 처리
    console.warn('[Auth] Refresh token expired or invalid. Ending session.');
    notifySessionExpired();
    throw refreshError;
  } finally {
    isRefreshing = false;
  }
};

/**
 * 요청 인터셉터: 모든 요청에 토큰 자동 주입 + 선제적 갱신
 */
api.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem('accessToken');
    if (!token) return config;

    // 선제적 갱신: 만료까지 1분(60초) 미만으로 남은 경우 미리 갱신 시도
    // 로컬 시간과 서버 시간 오차 가능성이 있으므로, 실패 시 기존 토큰으로 계속 진행
    const remainingSeconds = getTokenRemainingSeconds();
    if (remainingSeconds < 60 && remainingSeconds > 0) {
      console.warn(`[Auth] Access token expires in ${Math.round(remainingSeconds)}s. Attempting proactive refresh...`);
      try {
        const newToken = await handleTokenRefresh();
        config.headers.Authorization = `Bearer ${newToken}`;
        return config;
      } catch {
        // 선제적 갱신 실패 시 기존 토큰으로 요청 진행 (응답 인터셉터가 401 처리)
        console.warn('[Auth] Proactive refresh failed. Proceeding with current token.');
      }
    }

    config.headers.Authorization = `Bearer ${token}`;
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
    return response.data?.data !== undefined ? response.data.data : response.data;
  },
  async (error) => {
    const originalRequest = error.config;
    const errorResponse = error.response;
    let message = null;

    if (errorResponse) {
      // 401 Unauthorized: 토큰 만료 또는 인증 실패
      const isAuthPath =
        originalRequest.url.includes('/api/auth/login') ||
        originalRequest.url.includes('/api/auth/signup') ||
        originalRequest.url.includes('/api/auth/password-reset');

      if (errorResponse.status === 401 && !originalRequest._retry && !isAuthPath) {
        // 리프레시 토큰 요청 자체가 401이면 세션 만료 처리
        if (originalRequest.url.includes('/api/auth/refresh')) {
          console.warn('[Auth] Refresh request returned 401. Session expired.');
          notifySessionExpired();
          return Promise.reject(error);
        }

        originalRequest._retry = true;
        console.warn('[Auth] 401 Unauthorized. Attempting token refresh...');

        try {
          const accessToken = await handleTokenRefresh();
          // 인증 헤더 갱신 후 원래 요청 재시도
          api.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
          originalRequest.headers.Authorization = `Bearer ${accessToken}`;
          return api(originalRequest);
        } catch (refreshError) {
          return Promise.reject(refreshError);
        }
      }

      // 백엔드에서 내려주는 커스텀 메시지 우선 사용
      message = errorResponse.data?.message || message;
    } else if (error.request) {
      message = '서버 응답이 없습니다. 네트워크 상태를 확인해주세요.';
    }

    // 에러 객체에 가공된 메시지를 담아서 전달
    error.mappedMessage = message; 
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
