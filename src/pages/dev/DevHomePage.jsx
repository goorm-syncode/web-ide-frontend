import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Gnb from '../../components/layout/Gnb';
import ProgressBanner from '../../components/home/ProgressBanner';
import ProblemList from '../../components/home/ProblemList';
import Footer from '../../components/layout/Footer';
import MessageBox from '../../components/common/MessageBox';
import SearchFilter from '../../components/home/SearchFilter';
import DifficultyFilter from '../../components/home/DifficultyFilter';
import StatusFilter from '../../components/home/StatusFilter';
import Pagination from '../../components/common/Pagination';
import authService from '../../services/auth';
import { getContinueLearning } from '../../services/problem';

import '../../styles/pages/DevHomePage.css';

const mockProblems = [
  {
    id: 1,
    status: 'solved',
    category: 'ARRAY & HASHING',
    title: '두 수의 합 분할',
    description: '효율적인 검색을 위해 투 포인터 기법과 해시 맵 최적화의 기본을 마스터하세요.',
    difficulty: 'EASY',
    tags: ['Top 50', 'Microsoft'],
  },
  {
    id: 2,
    status: 'in_progress',
    category: 'DYNAMIC PROGRAMMING',
    title: '행렬의 가장 긴 경로',
    description:
      '복잡한 그리드 구조에서 가장 긴 경로를 찾기 위해 메모이제이션을 활용한 재귀 전략을 탐색하세요.',
    difficulty: 'MEDIUM',
    tags: ['Graphs', 'Google'],
  },
  {
    id: 3,
    status: 'unattempted',
    category: 'LINKED LISTS',
    title: 'K개의 정렬된 스트림 병합',
    description:
      '여러 개의 정렬된 데이터 스트림을 우선순위 큐를 활용하여 단일 출력으로 병합하세요.',
    difficulty: 'HARD',
    tags: ['Heap', 'Netflix'],
  },
  {
    id: 4,
    status: 'solved',
    category: 'TREES',
    title: '이진 트리 레벨 순회',
    description:
      '트리 노드를 레벨 단위로 탐색하고 처리하기 위해 너비 우선 탐색 알고리즘을 구현하세요.',
    difficulty: 'EASY',
    tags: ['Recursion'],
  },
  {
    id: 5,
    status: 'unattempted',
    category: 'GREEDY',
    title: '구간 스케줄링 최대화',
    description:
      '간격 스케줄링 문제를 해결하고 리소스 활용도를 최대화하기 위해 그리디 알고리즘을 학습하세요.',
    difficulty: 'MEDIUM',
    tags: ['Sorting'],
  },
  {
    id: 6,
    status: 'unattempted',
    category: 'BACKTRACKING',
    title: '스도쿠 해결 심화',
    description:
      '복잡한 제약 조건 충족 문제를 알고리즘적으로 해결하기 위해 백트래킹 기법을 깊이 파고들어 보세요.',
    difficulty: 'HARD',
    tags: ['Matrix'],
  },
  {
    id: 7,
    status: 'solved',
    category: 'GRAPHS',
    title: '네트워크 연결 최적화',
    description:
      '최소 신장 트리 알고리즘을 사용하여 모든 노드를 최소 비용으로 연결하는 방법을 학습합니다.',
    difficulty: 'MEDIUM',
    tags: ['Kruskal', 'Union-Find'],
  },
  {
    id: 8,
    status: 'in_progress',
    category: 'STRING',
    title: '가장 긴 공통 부분 문자열',
    description:
      '두 문자열 사이의 가장 긴 공통 시퀀스를 찾는 효율적인 동적 계획법 알고리즘을 구현하세요.',
    difficulty: 'MEDIUM',
    tags: ['DP', 'LCS'],
  },
  {
    id: 9,
    status: 'unattempted',
    category: 'BIT MANIPULATION',
    title: '싱글 넘버 찾기',
    description:
      '배열에서 단 한 번만 등장하는 숫자를 비트 연산(XOR)을 사용하여 선형 시간 내에 찾아내세요.',
    difficulty: 'EASY',
    tags: ['Bitwise'],
  },
  {
    id: 10,
    status: 'solved',
    category: 'STACK',
    title: '유효한 괄호 검사',
    description: '스택 자료구조를 사용하여 주어진 문자열의 괄호 짝이 맞는지 효율적으로 검사하세요.',
    difficulty: 'EASY',
    tags: ['Data Structure', 'Stack'],
  },
  {
    id: 11,
    status: 'in_progress',
    category: 'BINARY SEARCH',
    title: '회전된 정렬 배열 탐색',
    description:
      '회전된 정렬 배열에서 이진 탐색을 응용하여 특정 타겟 노드를 O(log N) 시간에 찾으세요.',
    difficulty: 'MEDIUM',
    tags: ['Search', 'Algorithm'],
  },
  {
    id: 12,
    status: 'unattempted',
    category: 'HEAP',
    title: '최대 힙 구현 및 활용',
    description: '우선순위 큐를 위한 최대 힙 자료구조를 구현하고 상위 K개 요소를 추출해보세요.',
    difficulty: 'HARD',
    tags: ['Priority Queue'],
  },
];

const DevHomePage = () => {
  const navigate = useNavigate();
  const [modalState, setModalState] = useState({
    isOpen: false,
    title: '',
    message: '',
    type: 'info',
  });

  const [authState, setAuthState] = useState({
    isLoggedIn: true,
    userName: 'Alex Coder',
  });

  // 진행률 관련 상태
  const [progress, setProgress] = useState(0);
  const [continueMission, setContinueMission] = useState(null);

  // 필터 및 페이지네이션 상태
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 12;

  // 데이터 페칭
  useEffect(() => {
    const fetchProgressData = async () => {
      try {
        const progressData = await authService.getMyProgress();
        if (progressData) {
          setProgress(progressData.progressPercent);
        }

        const continueData = await getContinueLearning();
        if (continueData && continueData.mission) {
          setContinueMission(continueData.mission);
        }
      } catch (error) {
        console.error('Failed to fetch progress data:', error);
      }
    };

    fetchProgressData();
  }, []);

  // 필터 변경 시 페이지 초기화
  const handleFilterChange = (setter) => (value) => {
    setter(value);
    setCurrentPage(1);
  };

  // 필터링 및 페이지네이션 로직
  const filteredProblems = mockProblems.filter((problem) => {
    const matchesSearch = problem.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDifficulty =
      selectedDifficulty === 'all' ||
      problem.difficulty.toLowerCase() === selectedDifficulty.toLowerCase();
    const matchesStatus = selectedStatus === 'all' || problem.status === selectedStatus;
    return matchesSearch && matchesDifficulty && matchesStatus;
  });

  const totalPages = Math.max(1, Math.ceil(filteredProblems.length / ITEMS_PER_PAGE));
  const paginatedProblems = filteredProblems.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  const showModal = (title, message, type = 'info') => {
    setModalState({ isOpen: true, title, message, type });
  };

  const closeModal = () => {
    setModalState((prev) => ({ ...prev, isOpen: false }));
  };

  const handleLogout = () => {
    setAuthState({ isLoggedIn: false, userName: '' });
    showModal('로그아웃', '정상적으로 로그아웃 되었습니다.', 'success');
  };

  const handleLogin = () => {
    // 실제 구현 시 모달이나 로그인 페이지로 이동하지만, 여기선 테스트 목적으로 즉시 로그인 처리
    setAuthState({ isLoggedIn: true, userName: 'Alex Coder' });
    showModal('로그인', '환영합니다, Alex Coder님!', 'success');
  };

  const handleContinue = () => {
    if (continueMission) {
      // 문제 상세 페이지로 이동 (라우터 설정에 따라 경로 조정 가능)
      navigate(`/dev/problem-description?id=${continueMission.missionId}`);
    } else {
      showModal('안내', '현재 이어서 진행할 문제가 없습니다. 새로운 문제를 시작해보세요!', 'info');
    }
  };

  return (
    <div className="dev-home-wrapper">
      <Gnb
        title="CODING TEST"
        isLoggedIn={authState.isLoggedIn}
        userName={authState.userName}
        onLogoutClick={handleLogout}
        onLoginClick={handleLogin}
      />
      <div className="home-top-spacer" />
      <div className="dev-home-content">
        <div className="home-header">
          <h1 className="home-title">문제 목록</h1>
          <div className="home-progress">
            <ProgressBanner progress={Math.round(progress)} onContinue={handleContinue} />
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

        <ProblemList
          problems={paginatedProblems}
          onProblemClick={(id) => {
            console.log(`Navigate to integrated view for problem ID: ${id}`);
          }}
        />

        <div className="home-pagination-wrapper">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      </div>

      <Footer />

      {/* 플로팅 채팅 컴포넌트 자리 (추후 삽입 예정) */}
      <div
        className="placeholder-floating-chat"
        onClick={() => showModal('채팅', '채팅 패널을 엽니다.', 'info')}
      >
        채팅 버튼
        <br />
        자리
      </div>

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

export default DevHomePage;
