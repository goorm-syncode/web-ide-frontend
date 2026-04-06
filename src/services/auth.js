import api from './api';

/**
 * 인증 및 사용자 관련 서비스
 *
 * - login: 로그인 (accessToken, refreshToken 발급)
 * - signup: 회원가입
 * - refresh: 토큰 재발급 (Refresh Token 회전)
 * - logout: 로그아웃
 * - requestPasswordReset: 비밀번호 재설정 링크 요청
 * - getMe: 내 프로필 정보 조회
 * - updateMe: 내 정보 수정 (닉네임)
 * - changePassword: 비밀번호 변경
 * - getMyProgress: 내 전체 미션 진행률 조회
 */
const authService = {
  /**
   * 로그인
   * @param {string} email
   * @param {string} password
   * @returns {Promise<Object>} TokenResponse
   */
  login: async (email, password) => {
    return await api.post('/api/auth/login', { email, password });
  },

  /**
   * 회원가입
   * @param {Object} signupData { email, nickname, password }
   * @returns {Promise<Object>} SignupResponse
   */
  signup: async (signupData) => {
    return await api.post('/api/auth/signup', signupData);
  },

  /**
   * 토큰 재발급 (Rotation)
   * @param {string} refreshToken
   * @returns {Promise<Object>} TokenResponse
   */
  refresh: async (refreshToken) => {
    return await api.post('/api/auth/refresh', { refreshToken });
  },

  /**
   * 로그아웃
   * @param {string} refreshToken
   * @returns {Promise<void>}
   */
  logout: async (refreshToken) => {
    return await api.post('/api/auth/logout', { refreshToken });
  },

  /**
   * 비밀번호 재설정 요청
   * @param {string} email
   * @returns {Promise<void>}
   */
  requestPasswordReset: async (email) => {
    return await api.post('/api/auth/password-reset', { email });
  },

  /**
   * 내 프로필 정보 조회
   * @returns {Promise<Object>} UserResponse
   */
  getMe: async () => {
    return await api.get('/api/users/me');
  },

  /**
   * 내 정보 수정 (닉네임)
   * @param {string} nickname
   * @returns {Promise<Object>} UserResponse
   */
  updateMe: async (nickname) => {
    return await api.patch('/api/users/me', { nickname });
  },

  /**
   * 비밀번호 변경
   * @param {Object} passwordData { currentPassword, newPassword }
   * @returns {Promise<void>}
   */
  changePassword: async (passwordData) => {
    return await api.patch('/api/users/me/password', passwordData);
  },

  /**
   * 내 전체 미션 진행률 조회
   * @returns {Promise<Object>} UserProgressResponse
   */
  getMyProgress: async () => {
    return await api.get('/api/users/me/progress');
  },
};

export default authService;
