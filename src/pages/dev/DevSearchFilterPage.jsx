import React, { useState } from 'react';
import SearchFilter from '../../components/home/SearchFilter';
import DifficultyFilter from '../../components/home/DifficultyFilter';
import StatusFilter from '../../components/home/StatusFilter';
import '../../styles/pages/DevSearchFilterPage.css';

/**
 * DevSearchFilterPage
 * SearchFilter 컴포넌트를 테스트하고 디자인 시안에 맞춘 필터 라인 통합 레이아웃을 확인하는 페이지입니다.
 */
const DevSearchFilterPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');

  return (
    <div className="dev-search-filter-page">
      <div className="dev-container">
        <h1 className="dev-title">SearchFilter Dev Sandbox</h1>
        
        <section className="dev-section">
          <h2>1. 단독 컴포넌트 테스트</h2>
          <div className="dev-item">
            <SearchFilter value={searchTerm} onChange={setSearchTerm} />
            <p className="dev-value-text">현재 검색어: <strong>{searchTerm || '(없음)'}</strong></p>
          </div>
        </section>

        <section className="dev-section">
          <h2>2. 필터 라인 통합 레이아웃 확인 (디자인 시안 기준)</h2>
          <div className="filter-line-container">
            <div className="filter-line-left">
              <DifficultyFilter value={selectedDifficulty} onChange={setSelectedDifficulty} />
              <StatusFilter value={selectedStatus} onChange={setSelectedStatus} />
            </div>
            <div className="filter-line-right">
              <SearchFilter value={searchTerm} onChange={setSearchTerm} />
            </div>
          </div>
          <p className="dev-info-text">
            * 디자인 시안에 맞춰 <strong>Difficulty + Status + Search</strong>가 한 줄에 배치됩니다.
          </p>
        </section>
      </div>
    </div>
  );
};

export default DevSearchFilterPage;
