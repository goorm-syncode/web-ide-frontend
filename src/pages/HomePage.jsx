import React, { useState, useEffect } from 'react';
import MyPageModal from './MyPageModal';
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
            <ProgressBanner
              progress={userProgress}
              onContinue={handleContinue}
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
              placeholder="미션 검색..."
            />
          </div>
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '50px' }}>미션을 불러오는 중...</div>
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
    </div>
  );
};

export default HomePage;
