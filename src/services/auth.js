import api from './api';

/**
 * 인증 및 사용자 관련 서비스
 */
export const authService = {
  /**
   * 회원가입
   * @param {Object} data { email, password, nickname }
   */
  signup: async (data) => {
    return await api.post('/api/auth/signup', data);
  },

  /**
   * 로그인
   * @param {Object} data { email, password }
   */
  login: async (data) => {
    const response = await api.post('/api/auth/login', data);
    // 응답 인터셉터가 이미 data field를 반환하도록 되어 있음
    if (response.accessToken) {
      localStorage.setItem('accessToken', response.accessToken);
      localStorage.setItem('refreshToken', response.refreshToken);
    }
    return response;
  },

  /**
   * 토큰 재발급
   * @param {string} refreshToken 
   */
  refresh: async (refreshToken) => {
    const response = await api.post('/api/auth/refresh', { refreshToken });
    if (response.accessToken) {
      localStorage.setItem('accessToken', response.accessToken);
      localStorage.setItem('refreshToken', response.refreshToken);
    }
    return response;
  },

  /**
   * 로그아웃
   * @param {string} refreshToken 
   */
  logout: async (refreshToken) => {
    const response = await api.post('/api/auth/logout', { refreshToken });
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    return response;
  },

  /**
   * 비밀번호 재설정 요청
   * @param {string} email 
   */
  passwordReset: async (email) => {
    return await api.post('/api/auth/password-reset', { email });
  },

  /**
   * 내 정보 조회
   */
  getMe: async () => {
    return await api.get('/api/users/me');
  },

  /**
   * 내 정보 수정 (닉네임)
   * @param {string} nickname 
   */
  updateMe: async (nickname) => {
    return await api.patch('/api/users/me', { nickname });
  },

  /**
   * 비밀번호 변경
   * @param {Object} data { currentPassword, newPassword }
   */
  changePassword: async (data) => {
    return await api.patch('/api/users/me/password', data);
  },

  /**
   * 사용자 전체 진행률 조회
   */
  getMyProgress: async () => {
    return await api.get('/api/users/me/progress');
  }
};

export default authService;
