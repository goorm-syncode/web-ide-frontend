/**
 * 문제(Problem) 관련 API 서비스 레이어
 *
 * 백엔드 연동 준비용 뼈대 파일.
 * 실제 엔드포인트 확정 시 이 파일에서 구현합니다.
 *
 * 컴포넌트에서 axios/fetch를 직접 사용하지 않고
 * 반드시 이 서비스 함수를 호출하도록 합니다. (instructions.md 원칙)
 */

// TODO: api.js에 axios 인스턴스 설정 후 아래 import 활성화
// import api from './api';

/**
 * 문제 목록 조회
 *
 * @param {Object} params
 * @param {string} [params.status='all']      - 상태 필터 ('all' | 'unattempted' | 'in_progress' | 'solved')
 * @param {string} [params.difficulty='all']  - 난이도 필터 ('all' | 'easy' | 'medium' | 'hard')
 * @param {number} [params.page=1]            - 페이지 번호 (1부터 시작)
 * @param {number} [params.size=9]            - 페이지 당 문제 수
 * @returns {Promise<Object>} - { problems: [], totalCount: number, totalPages: number }
 */
export const getProblems = async ({
  status = 'all',
  difficulty = 'all',
  page = 1,
  size: _size = 9,
} = {}) => {
  // TODO: 백엔드 API 연결 시 아래 주석 해제
  // const params = {};
  // if (status !== 'all') params.status = status;
  // if (difficulty !== 'all') params.difficulty = difficulty;
  // params.page = page;
  // params.size = size;
  // const response = await api.get('/api/problems', { params });
  // return response.data;

  // 개발용 Mock 반환 (백엔드 연결 전까지 사용)
  console.warn(
    '[problem.js] Mock 데이터 반환 중. 백엔드 연결 후 실제 API로 교체하세요.'
  );
  return {
    problems: [],
    totalCount: 0,
    totalPages: 0,
    currentPage: page,
    filters: { status, difficulty },
  };
};

/**
 * 문제 단건 조회
 *
 * @param {number|string} problemId - 문제 ID
 * @returns {Promise<Object>} - 문제 상세 데이터
 */
export const getProblemById = async (_problemId) => {
  // TODO: 백엔드 API 연결 시 아래 주석 해제
  // const response = await api.get(`/api/problems/${problemId}`);
  // return response.data;

  console.warn(
    '[problem.js] Mock 데이터 반환 중. 백엔드 연결 후 실제 API로 교체하세요.'
  );
  return null;
};
