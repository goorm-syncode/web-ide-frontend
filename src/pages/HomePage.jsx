import React, { useState, useEffect } from 'react';
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
import authService from '../services/auth';
import { getMissions, getContinueLearning } from '../services/problem';
import { getErrorMessage } from '../services/api';

import '../styles/pages/HomePage.css';

const HomePage = () => {
  const navigate = useNavigate();
  
  // UI 상태
  const [modalState, setModalState] = useState({
    isOpen: false,
    title: '',
    message: '',
    type: 'info',
  });

  const [authState, setAuthState] = useState({
    isLoggedIn: false,
    userName: '',
  });

  // 진행률 및 이어하기 데이터 상태
  const [isProgressLoading, setIsProgressLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [continueMission, setContinueMission] = useState(null);

  // 문제 목록 관련 상태
  const [isMissionsLoading, setIsMissionsLoading] = useState(true);
  const [missions, setMissions] = useState([]);
  const [totalElements, setTotalElements] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 12;

  // 필터 상태
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');

  /**
   * 초기 데이터 페칭 (인증 정보 및 진행률)
   */
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        // 1. 사용자 정보 조회
        const user = await authService.getMe();
        if (user) {
          setAuthState({ isLoggedIn: true, userName: user.nickname });
        }

        // 2. 진행률 및 이어하기 정보 조회 (병렬 처리)
        setIsProgressLoading(true);
        const [progressData, continueData] = await Promise.all([
          authService.getMyProgress(),
          getContinueLearning()
        ]);

        if (progressData) {
          setProgress(progressData.progressPercent || 0);
        }
        if (continueData && continueData.mission) {
          setContinueMission(continueData.mission);
        }
      } catch (error) {
        // 인증 실패 등으로 인한 에러는 무시(비로그인 상태 유지)
        console.error('Failed to fetch initial data:', error);
      } finally {
        setIsProgressLoading(false);
      }
    };

    fetchInitialData();
  }, []);

  /**
   * 문제 목록 페칭 (필터/페이지 변경 시 실행)
   */
  useEffect(() => {
    const fetchMissionsData = async () => {
      setIsMissionsLoading(true);
      try {
        const response = await getMissions({
          difficulty: selectedDifficulty === 'all' ? undefined : selectedDifficulty,
          page: currentPage - 1, // API는 0-based
          size: ITEMS_PER_PAGE
        });

        if (response) {
          // 백엔드 명세: MissionPageResponse { content, totalElements, totalPages, ... }
          let content = response.content || [];
          
          // 클라이언트 사이드 검색어 필터링 (API 미지원 대비)
          if (searchQuery) {
            content = content.filter(m => 
              m.title.toLowerCase().includes(searchQuery.toLowerCase())
            );
          }

          setMissions(content);
          setTotalElements(response.totalElements || 0);
          setTotalPages(response.totalPages || 1);
        }
      } catch (error) {
        showModal('오류', getErrorMessage(error), 'error');
      } finally {
        setIsMissionsLoading(false);
      }
    };

    fetchMissionsData();
  }, [selectedDifficulty, currentPage, searchQuery]);

  const showModal = (title, message, type = 'info') => {
    setModalState({ isOpen: true, title, message, type });
  };

  const closeModal = () => {
    setModalState((prev) => ({ ...prev, isOpen: false }));
  };

  const handleLogout = async () => {
    try {
      const refreshToken = localStorage.getItem('refreshToken');
      if (refreshToken) {
        await authService.logout(refreshToken);
      }
    } catch (error) {
      console.error('Logout failed:', error);
    } finally {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      setAuthState({ isLoggedIn: false, userName: '' });
      navigate('/login');
    }
  };

  const handleContinue = () => {
    if (continueMission) {
      navigate(`/problem-description?id=${continueMission.missionId}`);
    } else {
      showModal('안내', '진행 중인 문제가 없습니다. 목록에서 새로운 문제를 선택해 보세요!', 'info');
    }
  };

  const handleFilterChange = (setter) => (value) => {
    setter(value);
    setCurrentPage(1); // 필터 변경 시 첫 페이지로 이동
  };

  return (
    <div className="home-wrapper">
      <Gnb
        title="CODING TEST"
        isLoggedIn={authState.isLoggedIn}
        userName={authState.userName}
        onLogoutClick={handleLogout}
        onLoginClick={() => navigate('/login')}
      />
      <div className="home-top-spacer" />
      <div className="home-content">
        <div className="home-header">
          <h1 className="home-title">문제 목록</h1>
          <div className="home-progress">
            <ProgressBanner
              progress={Math.round(progress)}
              onContinue={handleContinue}
              loading={isProgressLoading}
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

        {isMissionsLoading ? (
            <div style={{ padding: '60px 0', textAlign: 'center', color: '#64748b' }}>
                데이터를 불러오고 있습니다...
            </div>
        ) : (
          <ProblemList
            problems={missions}
            onProblemClick={(id) => navigate(`/problem-description?id=${id}`)}
          />
        )}

        <div className="home-pagination-wrapper">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
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
