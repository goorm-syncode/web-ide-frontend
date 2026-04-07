import React, { useState, useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Gnb from '../components/layout/Gnb';
import ProgressBanner from '../components/common/ProgressBanner';
import ProblemList from '../components/domain/ProblemList';
import Footer from '../components/common/Footer';
import MessageBox from '../components/common/MessageBox';
import SearchFilter from '../components/features/SearchFilter';
import DifficultyFilter from '../components/features/DifficultyFilter';
import StatusFilter from '../components/features/StatusFilter';
import Pagination from '../components/common/Pagination';

import { getProblems } from '../services/problem';
import { getErrorMessage } from '../services/api';

import '../styles/pages/DevHomePage.css'; // 기존 스타일 재사용 (필요시 HomePage.css로 복사 가능)

const HomePage = () => {
  const navigate = useNavigate();
  // Redux 상태
  const { user, isAuthenticated } = useSelector((state) => state.auth);

  // UI 상태
  const [modalState, setModalState] = useState({
    isOpen: false,
    title: '',
    message: '',
    type: 'info',
  });

  // 데이터 상태
  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(1);

  // 필터 및 페이지네이션 상태
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 12;

  // 문제 목록 패칭 함수
  const fetchProblems = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getProblems({
        status: selectedStatus,
        difficulty: selectedDifficulty,
        keyword: searchQuery,
        page: currentPage,
        size: ITEMS_PER_PAGE,
      });
      
      console.log('--- HomePage: API로부터 데이터 로드 성공 ---');
      console.log('데이터 내용:', data);
      
      setProblems(data.content || []);
      setTotalPages(data.totalPages || 1);
    } catch (error) {
      console.error('--- HomePage: API 로드 실패 ---');
      console.error('에러 정보:', error);
      showModal('오류', getErrorMessage(error), 'error');
    } finally {
      setLoading(false);
    }
  }, [selectedStatus, selectedDifficulty, searchQuery, currentPage]);

  // 필터/페이지 변경 시 데이터 로드
  useEffect(() => {
    fetchProblems();
  }, [fetchProblems]);

  // 필터 변경 시 페이지 초기화 및 데이터 로드
  const handleFilterChange = (setter) => (value) => {
    setter(value);
    setCurrentPage(1);
  };

  const showModal = (title, message, type = 'info') => {
    setModalState({ isOpen: true, title, message, type });
  };

  const closeModal = () => {
    setModalState((prev) => ({ ...prev, isOpen: false }));
  };

  const handleLogout = () => {
    // 실제 로그아웃 로직 (dispatch(logout()) 등)은 Gnb 내부나 상위에서 처리 가능
    // 여기서는 메시지만 표시
    showModal('안내', '로그아웃 기능은 현재 연동 중입니다.', 'info');
  };

  const handleLogin = () => {
    navigate('/login');
  };

  return (
    <div className="dev-home-wrapper">
      <Gnb
        title="CODING TEST"
        isLoggedIn={isAuthenticated}
        userName={user?.nickname || '개발자'}
        onLogoutClick={handleLogout}
        onLoginClick={handleLogin}
      />
      <div className="home-top-spacer" />
      <div className="dev-home-content">
        <div className="home-header">
          <h1 className="home-title">문제 목록 (Real API)</h1>
          <div className="home-progress">
            <ProgressBanner
              progress={0} // 추후 API 연동 예정
              onContinue={() =>
                showModal('안내', '이전 학습 이어하기 기능을 준비 중입니다.', 'info')
              }
            />
          </div>
        </div>

        <div className="home-filter-row">
          <div className="home-filters-left">
            <DifficultyFilter
              value={selectedDifficulty}
              onChange={handleFilterChange(setSelectedDifficulty)}
            />
            <div className="filter-divider"></div>
            <StatusFilter
              value={selectedStatus}
              onChange={handleFilterChange(setSelectedStatus)}
            />
          </div>
          <div className="home-filters-right">
            <SearchFilter
              value={searchQuery}
              onChange={handleFilterChange(setSearchQuery)}
              placeholder="문제 제목을 검색하세요..."
            />
          </div>
        </div>

        <div className="problem-list-wrap">
          {/* 로딩 중일 때 기존 리스트를 유지한 채 반투명 오버레이 띄움 (꿀렁거림 원천 차단) */}
          {loading && (
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundColor: 'rgba(245, 245, 245, 0.7)',
                zIndex: 10,
                display: 'flex',
                justifyContent: 'center',
                paddingTop: '100px',
                color: '#94a3b8',
                fontWeight: 'bold',
                borderRadius: '8px',
              }}
            >
              문제를 불러오는 중입니다...
            </div>
          )}

          <ProblemList
            problems={problems}
            onProblemClick={(id) => {
              console.log(`Navigate to problem ID: ${id}`);
              // TODO: 문제 상세 페이지 이동 로직
            }}
          />

          {!loading && problems.length === 0 && (
            <div className="no-problem-result">
              검색 결과와 일치하는 문제가 없습니다.
            </div>
          )}
        </div>
      </div>

      <div className="home-pagination-wrapper">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>

      <Footer />

      <MessageBox
        isOpen={modalState.isOpen}
        onClose={closeModal}
        title={modalState.title}
        type={modalState.type}
      >
        {modalState.message}
      </MessageBox>
    </div>
  );
};

export default HomePage;
