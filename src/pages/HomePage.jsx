import React, { useState, useEffect } from 'react';
import MyPageModal from '../components/modals/MyPageModal';
import { useNavigate, useSearchParams } from 'react-router-dom';
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
import ChatWidget from '../components/chat/ChatWidget';

import { getMissions, getContinueMission } from '../services/missions';
import { getMyProgress } from '../services/userService';
import { getErrorMessage } from '../services/api';

import '../styles/pages/HomePage.css';

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

  const [isMyPageOpen, setIsMyPageOpen] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const ITEMS_PER_PAGE = 12;
  const searchInputRef = React.useRef(null);

  // URL에서 초기 상태 로드
  const initialSearch = searchParams.get('q') || '';
  const initialDifficulty = searchParams.get('difficulty') || 'ALL';
  const initialStatus = searchParams.get('status') || 'ALL';
  const initialPage = parseInt(searchParams.get('page')) || 1;

  // 필터 및 페이지네이션 상태
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [selectedDifficulty, setSelectedDifficulty] = useState(initialDifficulty);
  const [selectedStatus, setSelectedStatus] = useState(initialStatus);
  const [currentPage, setCurrentPage] = useState(initialPage);

  // 서버로부터 받아올 데이터 상태
  const [missions, setMissions] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [userProgress, setUserProgress] = useState(0);
  const [continueMission, setContinueMission] = useState(null);

  // 난이도 필터가 변경될 때마다 데이터를 가져오도록 합니다.
  useEffect(() => {
    const fetchMissions = async () => {
      try {
        setLoading(true);
        const data = await getMissions({
          difficulty: selectedDifficulty,
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
        showModal('Server Error', getErrorMessage(err), 'error');
      } finally {
        setLoading(false);
      }
    };

    fetchMissions();
  }, [selectedDifficulty, selectedStatus, searchQuery, currentPage]);


  // 상태 변경 시 URL 파라미터 동기화
  useEffect(() => {
    const params = {};
    if (searchQuery) params.q = searchQuery;
    if (selectedDifficulty !== 'ALL') params.difficulty = selectedDifficulty;
    if (selectedStatus !== 'ALL') params.status = selectedStatus;
    if (currentPage > 1) params.page = currentPage;

    setSearchParams(params, { replace: true });
  }, [searchQuery, selectedDifficulty, selectedStatus, currentPage, setSearchParams]);

  // 최초 진입 시 이어하기 미션 페이지로 자동 점프
  useEffect(() => {
    // URL에 아무런 필터나 페이지 정보가 없을 때만 동작
    const hasAnyFilter = searchParams.get('q') || 
                         searchParams.get('difficulty') || 
                         searchParams.get('status') || 
                         searchParams.get('page');

    if (isAuthenticated && !hasAnyFilter) {
      const jumpToContinueMission = async () => {
        try {
          // 1. 이어하기 미션 정보 가져오기
          const continueRes = await getContinueMission();
          if (!continueRes || !continueRes.mission) return;

          const targetId = continueRes.mission.missionId;
          
          // 2. 해당 미션이 몇 페이지에 있는지 탐색 (최대 10페이지)
          const MAX_SEARCH_PAGES = 10;
          for (let p = 0; p < MAX_SEARCH_PAGES; p++) {
            const data = await getMissions({ page: p, size: ITEMS_PER_PAGE });
            if (data && data.content) {
              const foundIdx = data.content.findIndex(m => m.id === targetId);
              if (foundIdx !== -1) {
                const targetPage = p + 1;
                if (targetPage !== 1) { // 1페이지가 아니면 해당 페이지로 이동
                  setCurrentPage(targetPage);
                }
                break;
              }
              if (data.last) break;
            }
          }
        } catch (err) {
          console.warn('[Jump] Failed to jump to continue mission:', err);
        }
      };

      jumpToContinueMission();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, setSearchParams]); // 초기 로드 및 인증 상태 변경 시에만 체크

  // 진행률 및 이어하기 데이터 가져오기
  useEffect(() => {
    if (!isAuthenticated) {
      setUserProgress(0);
      setContinueMission(null);
      return;
    }

    const fetchHomeData = async () => {
      try {
        const [progressRes, continueRes] = await Promise.all([
          getMyProgress(),
          getContinueMission(),
        ]);

        if (progressRes) {
          setUserProgress(progressRes.progressPercent || 0);
        }

        if (continueRes) {
          setContinueMission(continueRes.mission || null);
        }
      } catch (err) {
        console.error('홈 데이터 로딩 실패:', err);
      }
    };

    fetchHomeData();
  }, [isAuthenticated]);

  // 단축키 핸들러
  useEffect(() => {
    const handleGlobalKeyDown = (e) => {
      const activeElement = document.activeElement;
      const isInputFocused = activeElement.tagName === 'INPUT' || activeElement.tagName === 'TEXTAREA' || activeElement.isContentEditable;

      // 'T' 단축키 (한글 모드 ㅅ 포함)
      if (e.code === 'KeyT' && !isInputFocused) {
        e.preventDefault();
        if (searchInputRef.current) {
          searchInputRef.current.focus();
        }
      }

      // 검색창 포커스 중 Esc 누르면 포커스 해제
      if (e.key === 'Escape' && activeElement === searchInputRef.current) {
        searchInputRef.current.blur();
      }
    };

    window.addEventListener('keydown', handleGlobalKeyDown);
    return () => window.removeEventListener('keydown', handleGlobalKeyDown);
  }, []);

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
    dispatch(logoutAction());
  };

  const handleLogin = () => {
    navigate('/login');
  };

  const handleProblemClick = (id) => {
    navigate(`/missions/${id}`);
  };

  const handleContinue = () => {
    if (!isAuthenticated) {
      showModal('로그인 필요', '이어하기 기능을 사용하려면 로그인이 필요합니다.', 'info');
      return;
    }

    if (continueMission && continueMission.missionId) {
      navigate(`/missions/${continueMission.missionId}`);
    } else {
      showModal('안내', '더 이상 진행할 미션이 없습니다. 모든 미션을 완료하셨나요?', 'info');
    }
  };

  return (
    <div className="home-wrapper">
      <Gnb
        title="Learn Code"
        isLoggedIn={isAuthenticated}
        userName={user?.nickname || 'User'}
        onLogoutClick={handleLogout}
        onLoginClick={handleLogin}
        onSettingsClick={() => setIsMyPageOpen(true)}
      />
      <div className="home-top-spacer" />
      <div className="home-content">
        <div className="home-header">
          <h1 className="home-title">학습 미션</h1>
          <div className="home-progress">
            <ProgressBanner progress={userProgress} onContinue={handleContinue} />
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
              ref={searchInputRef}
              value={searchQuery}
              onChange={handleFilterChange(setSearchQuery)}
              placeholder="검색"
            />
          </div>
        </div>

        {loading ? (
          <div className="home-loading-state">
            <svg className="spinner-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{ animation: 'spin 1s linear infinite' }}>
              <path d="M21 12a9 9 0 1 1-6.219-8.56" />
            </svg>
            <span>미션을 불러오는 중...</span>
          </div>
        ) : (
          <ProblemList problems={missions} onProblemClick={handleProblemClick} />
        )}

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

      <MyPageModal isOpen={isMyPageOpen} onClose={() => setIsMyPageOpen(false)} />
      {isAuthenticated && <ChatWidget />}
    </div>
  );
};

export default HomePage;
