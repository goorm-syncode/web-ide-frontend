import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout as logoutAction } from '../store/slices/authSlice';
import Gnb from '../components/layout/Gnb';
import ProgressBanner from '../components/home/ProgressBanner';
import ProblemList from '../components/home/ProblemList';
import Footer from '../components/layout/Footer';
import MessageBox from '../components/common/MessageBox';
import SearchFilter from '../components/home/SearchFilter';
import DifficultyFilter from '../components/home/DifficultyFilter';
import StatusFilter from '../components/home/StatusFilter';
import Pagination from '../components/common/Pagination';

import { getMissions } from '../services/missions';
import { getErrorMessage } from '../services/api';

import '../styles/pages/DevHomePage.css'; // 기존 스타일 재사용

const HomePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  const [modalState, setModalState] = useState({
    isOpen: false,
    title: '',
    message: '',
    type: 'info',
  });

  // 필터 및 페이지네이션 상태
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState('ALL');
  const [selectedStatus, setSelectedStatus] = useState('ALL');
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 12;

  // 서버로부터 받아올 데이터 상태
  const [missions, setMissions] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  // 난이도 필터가 변경될 때마다 데이터를 가져오도록 합니다.
  // 페이지네이션 값(currentPage)도 백엔드는 0부터 시작하므로 currentPage - 1 처리
  useEffect(() => {
    const fetchMissions = async () => {
      try {
        setLoading(true);
        const data = await getMissions({
          difficulty: selectedDifficulty,
          // 다른 필터(status, keyword)는 각자 브랜치에서 구현될 예정이지만 함께 넘길 수도 있습니다.
          status: selectedStatus,
          keyword: searchQuery,
          page: currentPage - 1,
          size: ITEMS_PER_PAGE,
        });

        if (data && data.content) {
          setMissions(data.content);
          setTotalPages(data.totalPages || 1);
        } else {
          setMissions([]);
          setTotalPages(1);
        }
      } catch (err) {
        console.error('문제 목록 로딩 실패:', err);
        showModal('서버 오류', getErrorMessage(err), 'error');
      } finally {
        setLoading(false);
      }
    };

    fetchMissions();
  }, [selectedDifficulty, selectedStatus, searchQuery, currentPage]);

  const handleFilterChange = (setter) => (value) => {
    setter(value);
    setCurrentPage(1); // 필터 변경 시 첫 페이지로 이동
  };

  const showModal = (title, message, type = 'info') => {
    setModalState({ isOpen: true, title, message, type });
  };

  const closeModal = () => {
    setModalState((prev) => ({ ...prev, isOpen: false }));
  };

  const handleLogout = () => {
    dispatch(logoutAction());
  };

  const handleLogin = () => {
    navigate('/login');
  };

  const handleProblemClick = (id) => {
    navigate(`/missions/${id}`);
  };

  return (
    <div className="dev-home-wrapper">
      <Gnb
        title="LearnCode"
        isLoggedIn={isAuthenticated}
        userName={user?.nickname || '사용자'}
        onLogoutClick={handleLogout}
        onLoginClick={handleLogin}
      />
      <div className="home-top-spacer" />
      <div className="dev-home-content">
        <div className="home-header">
          <h1 className="home-title">문제 목록</h1>
          <div className="home-progress">
            <ProgressBanner
              progress={65}
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
            <StatusFilter value={selectedStatus} onChange={handleFilterChange(setSelectedStatus)} />
          </div>
          <div className="home-filters-right">
            <SearchFilter
              value={searchQuery}
              onChange={handleFilterChange(setSearchQuery)}
              placeholder="문제 제목을 검색하세요..."
            />
          </div>
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '50px' }}>데이터를 불러오는 중입니다...</div>
        ) : (
          <ProblemList problems={missions} onProblemClick={handleProblemClick} />
        )}

        {/* 데이터가 있을 때만 페이지네이션 표시 */}
        {!loading && missions.length > 0 && (
          <div className="home-pagination-wrapper">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </div>
        )}
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
