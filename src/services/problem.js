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
 * 문제 상태 매핑 (프론트엔드 -> 백엔드)
 */
const STATUS_MAP_TO_BACKEND = {
  all: 'ALL',
  unattempted: 'NOT_STARTED',
  in_progress: 'IN_PROGRESS',
  solved: 'COMPLETED',
};

/**
 * 문제 상태 매핑 (백엔드 -> 프론트엔드)
 */
const STATUS_MAP_TO_FRONTEND = {
  NOT_STARTED: 'unattempted',
  IN_PROGRESS: 'in_progress',
  COMPLETED: 'solved',
};

/**
 * 문제 목록 조회
 *
 * @param {Object} params
 * @param {string} [params.status='all']      - 상태 필터 ('all' | 'unattempted' | 'in_progress' | 'solved')
 * @param {string} [params.difficulty='all']  - 난이도 필터 ('all' | 'easy' | 'medium' | 'hard')
 * @param {string} [params.keyword]           - 검색 키워드
 * @param {number} [params.page=1]            - 페이지 번호 (1부터 시작)
 * @param {number} [params.size=12]           - 페이지 당 문제 수
 * @returns {Promise<Object>} - { content: [], totalElements: number, totalPages: number, page: number, size: number }
 */
export const getProblems = async ({
  status = 'all',
  difficulty = 'all',
  keyword,
  page = 1,
  size = 12,
} = {}) => {
  const params = {
    page: Math.max(0, page - 1), // API는 0-indexed
    size,
  };

  if (status !== 'all') {
    params.status = STATUS_MAP_TO_BACKEND[status];
  }
  
  if (difficulty !== 'all') {
    params.difficulty = difficulty.toUpperCase();
  }

  if (keyword) {
    params.keyword = keyword;
  }

  try {
    const response = await api.get('/api/missions', { params });
    
    // API 응답 데이터 가공 (ProblemCard 컴포넌트 형식에 맞춤)
    // api.js 인터셉터에서 response.data.data를 반환하므로 response는 { content, page, size, ... } 형태입니다.
    const mappedContent = response.content.map((item) => ({
      id: item.id,
      category: item.category,
      title: item.title,
      description: item.summary, // summary -> description
      difficulty: item.difficulty,
      status: STATUS_MAP_TO_FRONTEND[item.status] || 'unattempted',
      tags: item.tags || [],
    }));

    return {
      ...response,
      content: mappedContent,
    };
  } catch (error) {
    console.error('[problem.js] getProblems error:', error);
    throw error;
  }
};

/**
 * 문제 단건 조회
 *
 * @param {number|string} missionId - 문제 ID
 * @returns {Promise<Object>} - 문제 상세 데이터
 */
export const getProblemById = async (missionId) => {
  try {
    const response = await api.get(`/api/missions/${missionId}`);
    return response;
  } catch (error) {
    console.error('[problem.js] getProblemById error:', error);
    throw error;
  }
};

