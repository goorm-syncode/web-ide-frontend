import api from './api';

/**
 * 미션(문제) 필터링 및 목록 조회
 * OpenAPI /api/missions 대응
 */
export const getMissions = async ({
  category,
  difficulty,
  status,
  keyword,
  page = 0,
  size = 20,
} = {}) => {
  const params = { page, size };

  // 각 필터가 존재하는 경우 API 연동에 적합하게 파싱하여 전달합니다.
  if (category && category !== 'all') params.category = category;
  if (difficulty && difficulty !== 'all') params.difficulty = difficulty.toUpperCase();
  if (status && status !== 'all') params.status = status.toUpperCase();
  if (keyword) params.keyword = keyword;

  const response = await api.get('/api/missions', { params });
  return response;
};

/**
 * 특정 미션 상세 조회
 */
export const getMissionById = async (missionId) => {
  const response = await api.get(`/api/missions/${missionId}`);
  return response;
};
