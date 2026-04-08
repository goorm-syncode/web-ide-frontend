import React from 'react';
import ProblemCard from './ProblemCard';
import '../../styles/components/home/ProblemList.css';

/**
 * 문제 리스트 반응형 컴포넌트
 * @param {Object} props
 * @param {Array} props.problems - 문제 데이터 배열
 * @param {Function} [props.onProblemClick] - 카드 내 액션 버튼 클릭 핸들러
 */
const ProblemList = ({ problems = [], onProblemClick }) => {
  return (
    <div className="problem-list-container">
      {problems.map((problem) => (
        <ProblemCard
          key={problem.id}
          {...problem}
          description={problem.summary}
          onClickAction={() => onProblemClick && onProblemClick(problem.id)}
        />
      ))}
    </div>
  );
};

export default ProblemList;
