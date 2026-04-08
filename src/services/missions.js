/**
 * 미션(Mission) 관련 API 서비스 레이어
 *
 * backend endpoint '/api/missions' 와 통신합니다.
 */

import api from './api';

/**
 * 미션(문제) 상세 조회
 *
 * @param {number|string} missionId - 미션 ID
 * @returns {Promise<Object>} - 미션 상세 데이터 (MissionDetailResponse)
 */
export const getMissionById = async (missionId) => {
  const response = await api.get(`/api/missions/${missionId}`);
  // api.js response interceptor 에서 response.data?.data 를 리턴하므로
  // 여기서는 바로 response 를 반환합니다.
  return response;
};
