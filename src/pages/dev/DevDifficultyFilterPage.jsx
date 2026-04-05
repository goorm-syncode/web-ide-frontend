import { useState } from 'react';
import DifficultyFilter from '../../components/features/DifficultyFilter';
import '../../styles/pages/DevDifficultyFilterPage.css';

const DevDifficultyFilterPage = () => {
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');

  return (
    <div className="dev-difficulty-page">
      <h1 className="dev-difficulty-page__title">
        DifficultyFilter Dev Page
      </h1>

      <section className="dev-difficulty-page__section">
        <h2 className="dev-difficulty-page__section-title">
          비제어 모드 (uncontrolled) — 내부 상태 자체 관리
        </h2>
        <div className="dev-difficulty-page__container">
          <DifficultyFilter />
        </div>
      </section>

      <section className="dev-difficulty-page__section">
        <h2 className="dev-difficulty-page__section-title">
          제어 모드 (controlled) — 외부 상태로 제어
        </h2>
        <div className="dev-difficulty-page__container">
          <DifficultyFilter value={selectedDifficulty} onChange={setSelectedDifficulty} />
          <p className="dev-difficulty-page__value-text">
            선택된 값: <strong className="dev-difficulty-page__selected-value">{selectedDifficulty}</strong>
          </p>
        </div>
      </section>
    </div>
  );
};

export default DevDifficultyFilterPage;
