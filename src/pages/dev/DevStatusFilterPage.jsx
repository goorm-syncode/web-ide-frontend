import { useState } from 'react';
import StatusFilter from '../../components/home/StatusFilter';
import DifficultyFilter from '../../components/home/DifficultyFilter';
import '../../styles/pages/DevStatusFilterPage.css';

/**
 * StatusFilter Dev 테스트 페이지
 * 라우트: /dev/status-filter
 *
 * 비제어/제어 모드 및 DifficultyFilter와 조합 UI를 확인한다.
 */
const DevStatusFilterPage = () => {
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');

  return (
    <div className="dev-status-filter-page">
      <h1 className="dev-status-filter-page__title">
        StatusFilter Dev Page
      </h1>

      {/* 비제어 모드 */}
      <section className="dev-status-filter-page__section">
        <h2 className="dev-status-filter-page__section-title">
          비제어 모드 (uncontrolled) — 내부 상태 자체 관리
        </h2>
        <div className="dev-status-filter-page__container">
          <StatusFilter />
        </div>
      </section>

      {/* 제어 모드 */}
      <section className="dev-status-filter-page__section">
        <h2 className="dev-status-filter-page__section-title">
          제어 모드 (controlled) — 외부 상태로 제어
        </h2>
        <div className="dev-status-filter-page__container">
          <StatusFilter value={selectedStatus} onChange={setSelectedStatus} />
          <p className="dev-status-filter-page__value-text">
            선택된 값:{' '}
            <strong className="dev-status-filter-page__selected-value">
              {selectedStatus}
            </strong>
          </p>
        </div>
      </section>

      {/* 조합 UI: DifficultyFilter + StatusFilter */}
      <section className="dev-status-filter-page__section">
        <h2 className="dev-status-filter-page__section-title">
          조합 UI — DifficultyFilter + StatusFilter (실제 필터바 형태)
        </h2>
        <div className="dev-status-filter-page__container">
          <div className="dev-status-filter-page__combo-row">
            <DifficultyFilter
              value={selectedDifficulty}
              onChange={setSelectedDifficulty}
            />
            <span
              className="dev-status-filter-page__divider"
              aria-hidden="true"
            />
            <StatusFilter
              value={selectedStatus}
              onChange={setSelectedStatus}
            />
          </div>
          <p className="dev-status-filter-page__value-text">
            난이도:{' '}
            <strong className="dev-status-filter-page__selected-value">
              {selectedDifficulty}
            </strong>{' '}
            &nbsp;/&nbsp; 상태:{' '}
            <strong className="dev-status-filter-page__selected-value">
              {selectedStatus}
            </strong>
          </p>
        </div>
      </section>
    </div>
  );
};

export default DevStatusFilterPage;
