import ProblemCard from '../../components/domain/ProblemCard';
import '../../styles/pages/DevProblemCardPage.css';

const DevProblemCardPage = () => {
  return (
    <div className="dev-problem-card-page">
      <h1 className="dev-problem-card-title">Problem Card Component Test</h1>

      <div className="dev-problem-card-grid">
        {/* 완료 (Solved) 카드 테스트 */}
        <ProblemCard
          status="solved"
          category="if & for(조건문)"
          title="두 수의 합 구하기"
          description="배열 내 원소를 사용해 타겟 값을 반환하는 인덱스를 구합니다."
          difficulty="EASY"
          tags={['Top 50', 'Microsoft', '배열', '해시맵']}
          onClickAction={() => alert('Review Code 클릭됨')}
        />

        {/* 진행중 (In Progress) 카드 테스트 */}
        <ProblemCard
          status="in_progress"
          category="if & for(조건문)"
          title="행렬 내 최장 경로 탐색"
          description="메모이제이션 기법을 적용해 행렬의 최장 경로를 탐색합니다."
          difficulty="MEDIUM"
          tags={['Graphs', 'Google']}
          onClickAction={() => alert('Resume Session 클릭됨')}
        />

        {/* 미해결 (Unattempted) 카드 테스트 */}
        <ProblemCard
          status="unattempted"
          category="if & for(조건문)"
          title="K개 정렬 리스트 병합"
          description="우선순위 큐를 응용하여 정렬된 여러 리스트를 하나로 병합합니다."
          difficulty="HARD"
          tags={['Heap', 'Netflix', '데이터 구조']}
          onClickAction={() => alert('Start Problem 클릭됨')}
        />
      </div>
    </div>
  );
};

export default DevProblemCardPage;
