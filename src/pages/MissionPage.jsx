import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout as logoutAction } from '../store/slices/authSlice';
import * as monaco from 'monaco-editor';
import Gnb from '../components/layout/Gnb';
import Footer from '../components/layout/Footer';
import ProblemDescriptionPanel from '../components/mission/ProblemDescriptionPanel';
import ExecutionResultPanel from '../components/mission/ExecutionResultPanel';
import '../styles/pages/MissionPage.css';

// Mock Problem Data
const MOCK_PROBLEM = {
  title: 'Two Sum',
  difficulty: 'Easy',
  markdownContent: `
Given an array of integers \`nums\` and an integer \`target\`, return indices of the two numbers such that they add up to \`target\`.

You may assume that each input would have **exactly one solution**, and you may not use the same element twice.

You can return the answer in any order.

### Constraints:
- \`2 <= nums.length <= 104\`
- \`-109 <= nums[i] <= 109\`
- \`-109 <= target <= 109\`
- **Only one valid answer exists.**
  `,
  examples: [
    {
      title: '예제 1',
      input: 'nums = [2,7,11,15], target = 9',
      output: '[0,1]',
      explanation: 'Because nums[0] + nums[1] == 9, we return [0, 1].',
    },
    {
      title: '예제 2',
      input: 'nums = [3,2,4], target = 6',
      output: '[1,2]',
    },
  ],
};

const INITIAL_CODE = `class Solution:
    def twoSum(self, nums: List[int], target: int) -> List[int]:
        # Write your code here
        prevMap = {} # val : index
        
        for i, n in enumerate(nums):
            diff = target - n
            if diff in prevMap:
                return [prevMap[diff], i]
            prevMap[n] = i
        return
`;

const MissionPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  // Panel state with localStorage persistence
  const [leftWidth, setLeftWidth] = useState(() => {
    const saved = localStorage.getItem('mission-panel-left-width');
    if (saved) return parseFloat(saved);

    // Default: 480px equivalent in percentage, but max 40%
    const defaultPixelWidth = 480;
    const percentage = (defaultPixelWidth / window.innerWidth) * 100;
    return Math.min(percentage, 40);
  });
  const [bottomHeight, setBottomHeight] = useState(() => {
    const saved = localStorage.getItem('mission-panel-bottom-height');
    return saved ? parseFloat(saved) : 30; // Default 30%
  });

  const [language, setLanguage] = useState('python');

  const [isResizingMain, setIsResizingMain] = useState(false);
  const [isResizingIde, setIsResizingIde] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [output, setOutput] = useState('');

  const monacoContainerRef = useRef(null);
  const editorInstance = useRef(null);

  // Initialize Monaco Editor
  useEffect(() => {
    if (monacoContainerRef.current) {
      editorInstance.current = monaco.editor.create(monacoContainerRef.current, {
        value: INITIAL_CODE,
        language: 'python',
        theme: 'vs-dark',
        automaticLayout: true,
        minimap: { enabled: true },
        fontSize: 14,
        lineNumbers: 'on',
        lineNumbersMinChars: 6,
        lineDecorationsWidth: 20,
        scrollbar: {
          vertical: 'visible',
          verticalScrollbarSize: 8,
          horizontal: 'visible',
          horizontalScrollbarSize: 8,
          useShadows: true,
        },
        scrollBeyondLastLine: true,
        padding: { top: 16, bottom: 16 },
      });
    }

    return () => {
      if (editorInstance.current) {
        editorInstance.current.dispose();
      }
    };
  }, []);

  // Update layout when panels change
  useEffect(() => {
    if (editorInstance.current) {
      editorInstance.current.layout();
    }
    localStorage.setItem('mission-panel-left-width', leftWidth);
    localStorage.setItem('mission-panel-bottom-height', bottomHeight);
  }, [leftWidth, bottomHeight]);

  // Main Resizer (Horizontal)
  const handleMainMouseDown = (e) => {
    setIsResizingMain(true);
    e.preventDefault();
  };

  // IDE Resizer (Vertical)
  const handleIdeMouseDown = (e) => {
    setIsResizingIde(true);
    e.preventDefault();
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (isResizingMain) {
        const newWidth = (e.clientX / window.innerWidth) * 100;
        if (newWidth > 15 && newWidth < 85) {
          setLeftWidth(newWidth);
        }
      } else if (isResizingIde) {
        const ideContainer = document.querySelector('.panel-right');
        if (ideContainer) {
          const rect = ideContainer.getBoundingClientRect();
          const relativeY = e.clientY - rect.top;
          const newHeight = 100 - (relativeY / rect.height) * 100;
          if (newHeight > 10 && newHeight < 70) {
            setBottomHeight(newHeight);
          }
        }
      }
    };

    const handleMouseUp = () => {
      setIsResizingMain(false);
      setIsResizingIde(false);
    };

    if (isResizingMain || isResizingIde) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = isResizingMain ? 'col-resize' : 'row-resize';
    } else {
      document.body.style.cursor = 'default';
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isResizingMain, isResizingIde]);

  const handleLanguageChange = (e) => {
    const newLang = e.target.value;
    setLanguage(newLang);
    if (editorInstance.current) {
      const model = editorInstance.current.getModel();
      monaco.editor.setModelLanguage(model, newLang);
    }
  };

  const handleRun = () => {
    setIsLoading(true);
    setOutput('Running code...\n');
    setTimeout(() => {
      setOutput('Success!\nInput: nums = [2,7,11,15], target = 9\nOutput: [0,1]\nExpected: [0,1]');
      setIsLoading(false);
    }, 1500);
  };

  const handleTest = () => {
    setIsLoading(true);
    setOutput('Testing...\n');
    setTimeout(() => {
      setOutput('All test cases passed.');
      setIsLoading(false);
    }, 1000);
  };

  const handleSubmit = () => {
    setIsLoading(true);
    setOutput('Submitting...\n');
    setTimeout(() => {
      setOutput('Accepted!\nRuntime: 48ms (Beats 92%)\nMemory: 15.2MB (Beats 85%)');
      setIsLoading(false);
    }, 2000);
  };

  return (
    <div className="mission-page-container">
      <Gnb
        title="LearnCode"
        isLoggedIn={isAuthenticated}
        userName={user?.userName || '사용자'}
        showBackButton
        onBackClick={() => navigate('/home')}
        onLogoutClick={() => dispatch(logoutAction())}
      />

      <main className="mission-main-content">
        {/* Left: Problem Description */}
        <div className="panel-left" style={{ width: `${leftWidth}%` }}>
          <ProblemDescriptionPanel
            title={MOCK_PROBLEM.title}
            difficulty={MOCK_PROBLEM.difficulty}
            markdownContent={MOCK_PROBLEM.markdownContent}
            examples={MOCK_PROBLEM.examples}
          />
        </div>

        {/* Horizontal Resizer */}
        <div
          className={`resizer-horizontal ${isResizingMain ? 'dragging' : ''}`}
          onMouseDown={handleMainMouseDown}
        />

        {/* Right: IDE Area */}
        <div className="panel-right" style={{ width: `${100 - leftWidth}%` }}>
          <div className="panel-editor-wrapper" style={{ height: `${100 - bottomHeight}%` }}>
            <header className="editor-header">
              <div className="editor-controls">
                <div className="select-wrapper">
                  <select className="lang-select" value={language} onChange={handleLanguageChange}>
                    <option value="python">Python</option>
                    <option value="javascript">JavaScript</option>
                    <option value="java">Java</option>
                    <option value="c">C</option>
                  </select>
                  <svg
                    className="select-arrow"
                    width="10"
                    height="6"
                    viewBox="0 0 10 6"
                    fill="none"
                  >
                    <path
                      d="M1 1L5 5L9 1"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <span className="file-name">
                  {language === 'python'
                    ? 'Solution.py'
                    : language === 'javascript'
                      ? 'Solution.js'
                      : language === 'java'
                        ? 'Solution.java'
                        : 'Solution.c'}
                </span>
              </div>
              <div className="editor-actions">
                <button className="icon-btn" title="Settings">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <circle cx="12" cy="12" r="3"></circle>
                    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
                  </svg>
                </button>
                <button className="icon-btn" title="Full Screen">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"></path>
                  </svg>
                </button>
              </div>
            </header>
            <div ref={monacoContainerRef} className="monaco-container" />
          </div>

          {/* Vertical Resizer */}
          <div
            className={`resizer-vertical ${isResizingIde ? 'dragging' : ''}`}
            onMouseDown={handleIdeMouseDown}
          />

          {/* Bottom: Execution Results */}
          <div className="panel-results" style={{ height: `${bottomHeight}%` }}>
            <ExecutionResultPanel
              output={output}
              isLoading={isLoading}
              onRun={handleRun}
              onTest={handleTest}
              onSubmit={handleSubmit}
            />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default MissionPage;
