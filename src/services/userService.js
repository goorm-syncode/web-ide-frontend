import api from './api';

/**
 * 현재 로그인한 사용자의 정보를 가져옵니다.
 * OpenAPI /api/users/me 대응
 * 
 * @returns {Promise<Object>} - 사용자 정보 (UserResponse)
 */
export const getCurrentUser = async () => {
  const response = await api.get('/api/users/me');
  return response;
};

/**
 * 사용자 정보 수정 (닉네임)
 * OpenAPI PATCH /api/users/me 대응
 * 
 * @param {Object} data - 수정할 데이터 ({ nickname })
 * @returns {Promise<Object>} - 수정된 사용자 정보
 */
export const updateMe = async (data) => {
  const response = await api.patch('/api/users/me', data);
  return response;
};

/**
 * 사용자 전체 진행률 조회
 * OpenAPI /api/users/me/progress 대응
 */
export const getMyProgress = async () => {
  const response = await api.get('/api/users/me/progress');
  return response;
};
