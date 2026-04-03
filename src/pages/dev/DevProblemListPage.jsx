import React from 'react';
import ProblemList from '../../components/domain/ProblemList';
import '../../styles/pages/DevProblemListPage.css';

const mockProblems = [
  { 
    id: 1, 
    status: 'unattempted', 
    category: 'ARRAY & HASHING', 
    title: 'Two Sum', 
    description: '배열과 타겟 숫자가 주어질 때 두 수의 합이 타겟이 되는 원소들의 인덱스를 반환하는 함수를 작성하세요.', 
    difficulty: 'EASY', 
    tags: ['Hash Table', 'Array'] 
  },
  { 
    id: 2, 
    status: 'in_progress', 
    category: 'LINKED LIST', 
    title: 'Add Two Numbers', 
    description: '역순으로 저장된 두 개의 연결 리스트 형태의 숫자를 더해 새로운 연결 리스트를 반환하세요.', 
    difficulty: 'MEDIUM', 
    tags: ['Linked List', 'Math'] 
  },
  { 
    id: 3, 
    status: 'solved', 
    category: 'DYNAMIC PROGRAMMING', 
    title: 'Longest Palindromic Substring', 
    description: '주어진 문자열에서 가장 긴 팰린드롬 부분 문자열의 길이를 구하세요.', 
    difficulty: 'MEDIUM', 
    tags: ['String'] 
  },
  { 
    id: 4, 
    status: 'unattempted', 
    category: 'GRAPH', 
    title: 'Number of Islands', 
    description: '1층(땅)과 0(물)으로 이루어진 2D 그리드 맵이 주어질 때, 연결된 섬의 개수를 구하세요.', 
    difficulty: 'MEDIUM', 
    tags: ['DFS', 'BFS'] 
  },
  { 
    id: 5, 
    status: 'unattempted', 
    category: 'TREE', 
    title: 'Binary Tree Maximum Path Sum', 
    description: '이진 트리에서 아무 노드에서 시작해 다른 노드로 끝나는 경로의 합 중 최댓값을 구하세요.', 
    difficulty: 'HARD', 
    tags: ['Tree', 'DFS'] 
  },
  { 
    id: 6, 
    status: 'solved', 
    category: 'MATH', 
    title: 'Palindrome Number', 
    description: '정수 x가 주어질 때 x가 팰린드롬인지 판별하세요.', 
    difficulty: 'EASY', 
    tags: ['Math'] 
  },
];

const difficultyWeight = { EASY: 1, MEDIUM: 2, HARD: 3 };

const DevProblemListPage = () => {
  const handleProblemClick = (id) => {
    alert(`문제 풀기로 이동: Problem ID ${id}`);
  };

  // 샘플 데이터 난이도별 정렬 (EASY -> MEDIUM -> HARD)
  const sortedProblems = [...mockProblems].sort(
    (a, b) => difficultyWeight[a.difficulty] - difficultyWeight[b.difficulty]
  );

  return (
    <div className="dev-problem-list-wrapper">
      <div className="dev-problem-list-content">
        <h1 className="dev-title">ProblemList 반응형 컴포넌트</h1>
        <p className="dev-subtitle">해상도를 조절해 모바일(1열), 태블릿(2열), 데스크탑(3열) 뷰를 확인하세요. (난이도 쉬움 → 어려움 순 정렬)</p>
        <ProblemList problems={sortedProblems} onProblemClick={handleProblemClick} />
      </div>
    </div>
  );
};

export default DevProblemListPage;
