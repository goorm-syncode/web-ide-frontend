import React from 'react';
import PropTypes from 'prop-types';
import ProblemCard from './ProblemCard';
import '../../styles/components/home/ProblemList.css';

/**
 * 문제 리스트 반응형 컴포넌트
 * @param {Object} props
 * @param {Array} props.problems - 문제 데이터 배열
 * @param {Function} [props.onProblemClick] - 카드 내 액션 버튼 클릭 핸들러
 */
const ProblemList = ({ problems = [], onProblemClick }) => {
  // 서버 API 상태값 → ProblemCard 내부 상태값 변환
  const normalizeStatus = (serverStatus) => {
    switch (serverStatus) {
      case 'COMPLETED':    return 'solved';
      case 'IN_PROGRESS':  return 'in_progress';
      case 'NOT_STARTED':  return 'unattempted';
      default:             return 'unattempted';
    }
  };

  return (
    <div className="problem-list-container">
      {problems.map((problem) => (
        <ProblemCard
          key={problem.id}
          {...problem}
          status={normalizeStatus(problem.status)}
          description={problem.summary}
          onClickAction={() => onProblemClick && onProblemClick(problem.id)}
        />
      ))}
    </div>
  );
};

ProblemList.propTypes = {
  problems: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      status: PropTypes.string,
      category: PropTypes.string,
      title: PropTypes.string,
      summary: PropTypes.string,
      difficulty: PropTypes.string,
      tags: PropTypes.arrayOf(PropTypes.string),
    }),
  ).isRequired,
  onProblemClick: PropTypes.func,
};

export default ProblemList;
