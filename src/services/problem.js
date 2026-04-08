/**
 * 문제(Problem) 관련 API 서비스 레이어
 *
 * 백엔드 연동 준비용 뼈대 파일.
 * 실제 엔드포인트 확정 시 이 파일에서 구현합니다.
 *
 * 컴포넌트에서 axios/fetch를 직접 사용하지 않고
 * 반드시 이 서비스 함수를 호출하도록 합니다. (instructions.md 원칙)
 */

import api from './api';

/**
 * 문제 목록 조회
 *
 * @param {Object} params
 * @param {string} [params.category]          - 카테고리 필터
 * @param {string} [params.difficulty]        - 난이도 필터 ('EASY' | 'MEDIUM' | 'HARD')
 * @param {number} [params.page=0]            - 페이지 번호 (0부터 시작)
 * @param {number} [params.size=20]           - 페이지 당 문제 수
 * @returns {Promise<Object>} - MissionPageResponse
 */
export const getMissions = async ({
  category,
  difficulty,
  page = 0,
  size = 20,
} = {}) => {
  const params = { page, size };
  if (category) params.category = category;
  if (difficulty && difficulty !== 'all') params.difficulty = difficulty.toUpperCase();

  return await api.get('/api/missions', { params });
};

/**
 * 문제 상세 조회
 *
 * @param {number|string} missionId - 미션 ID
 * @returns {Promise<Object>} - MissionDetailResponse
 */
export const getMissionDetail = async (missionId) => {
  return await api.get(`/api/missions/${missionId}`);
};

/**
 * 이어하기 문제 조회
 *
 * @returns {Promise<Object>} - ContinueLearningResponse
 */
export const getContinueLearning = async () => {
  return await api.get('/api/missions/continue');
};
