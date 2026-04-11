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
  if (category && category.toUpperCase() !== 'ALL') params.category = category;
  if (difficulty && difficulty.toUpperCase() !== 'ALL') params.difficulty = difficulty.toUpperCase();
  if (status && status.toUpperCase() !== 'ALL') params.status = status.toUpperCase();
  if (keyword) params.keyword = keyword;

  const response = await api.get('/api/missions', { params });
  return response;
};

/**
 * 미션(문제) 상세 조회
 *
 * @param {number|string} missionId - 미션 ID
 * @returns {Promise<Object>} - 미션 상세 데이터 (MissionDetailResponse)
 */
export const getMissionById = async (missionId) => {
  const response = await api.get(`/api/missions/${missionId}`);
  return response;
};

/**
 * 미션 진행 상태 조회
 * @param {number|string} missionId
 */
export const getMissionProgress = async (missionId) => {
  const response = await api.get(`/api/missions/${missionId}/progress`);
  return response;
};

/**
 * 미션 진행 상태 저장/갱신
 * @param {number|string} missionId
 * @param {'IN_PROGRESS'|'COMPLETED'} status
 */
export const updateMissionProgress = async (missionId, status) => {
  const response = await api.post(`/api/missions/${missionId}/progress`, { status });
  return response;
};

/**
 * 코드 드래프트 불러오기
 * @param {number|string} missionId
 * @param {string} language - C, CPP, JAVA, JAVASCRIPT, GO, PYTHON, KOTLIN
 */
export const getDraft = async (missionId, language) => {
  const response = await api.get(`/api/missions/${missionId}/draft`, {
    params: { language: language.toUpperCase() },
  });
  return response;
};

/**
 * 코드 드래프트 저장
 * @param {number|string} missionId
 * @param {string} language
 * @param {string} code
 */
export const saveDraft = async (missionId, language, code) => {
  const response = await api.put(`/api/missions/${missionId}/draft`, {
    language: language.toUpperCase(),
    code,
  });
  return response;
};

/**
 * 코드 실행
 * @param {Object} data - { missionId, sourceCode, language, stdin }
 */
export const executeCode = async (data) => {
  const response = await api.post('/api/runner/executions', {
    ...data,
    language: data.language.toUpperCase(),
  });
  return response;
};

/**
 * 코드 제출 및 채점
 * @param {Object} data - { missionId, sourceCode, language }
 */
export const submitCode = async (data) => {
  const response = await api.post('/api/runner/submissions', {
    ...data,
    language: data.language.toUpperCase(),
  });
  return response;
};
/**
 * 이어하기 문제 조회
 * OpenAPI /api/missions/continue 대응
 */
export const getContinueMission = async () => {
  const response = await api.get('/api/missions/continue');
  return response;
};
