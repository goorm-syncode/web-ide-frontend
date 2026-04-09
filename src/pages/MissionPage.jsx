import { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout as logoutAction } from '../store/slices/authSlice';
import * as monaco from 'monaco-editor';
import Gnb from '../components/layout/Gnb';
import Footer from '../components/layout/Footer';
import ProblemDescriptionPanel from '../components/mission/ProblemDescriptionPanel';
import ExecutionResultPanel from '../components/mission/ExecutionResultPanel';
import {
  getMissionById,
  getDraft,
  saveDraft,
  executeCode,
  submitCode,
  updateMissionProgress,
} from '../services/missions';
import { mapErrorMessage } from '../services/errorMapper';
import '../styles/pages/MissionPage.css';

const RunIcon = () => (
  <svg
    className="btn-icon"
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polygon points="5 3 19 12 5 21 5 3" />
  </svg>
);

const SaveIcon = () => (
  <svg
    className="btn-icon"
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path>
    <polyline points="17 21 17 13 7 13 7 21"></polyline>
    <polyline points="7 3 7 8 15 8"></polyline>
  </svg>
);

const SubmitIcon = () => (
  <svg
    className="btn-icon"
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M22 2L11 13" />
    <path d="M22 2L15 22L11 13L2 9L22 2Z" />
  </svg>
);

const LANG_MAP = {
  python: 'PYTHON',
  javascript: 'JAVASCRIPT',
  java: 'JAVA',
  c: 'C',
};

const LANG_REVERSE_MAP = {
  PYTHON: 'python',
  JAVASCRIPT: 'javascript',
  JAVA: 'java',
  C: 'c',
};

const MissionPage = () => {
  const { missionId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  // Core Data State
  const [mission, setMission] = useState(null);
  const [lastSavedCode, setLastSavedCode] = useState('');
  const [currentCode, setCurrentCode] = useState('');
  const [language, setLanguage] = useState('javascript');
  const [isLoaded, setIsLoaded] = useState(false);

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

  const [isResizingMain, setIsResizingMain] = useState(false);
  const [isResizingIde, setIsResizingIde] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [output, setOutput] = useState('');
  const [errorTabContent, setErrorTabContent] = useState('');
  const [testCaseInput, setTestCaseInput] = useState('');

  const monacoContainerRef = useRef(null);
  const editorInstance = useRef(null);

  const isDirty = currentCode !== lastSavedCode;

  // Fetch initial mission data
  useEffect(() => {
    const fetchMissionData = async () => {
      try {
        setIsLoading(true);
        const missionData = await getMissionById(missionId);
        setMission(missionData);

        // Update progress to IN_PROGRESS if NOT_STARTED
        if (missionData.userStatus === 'NOT_STARTED') {
          await updateMissionProgress(missionId, 'IN_PROGRESS');
        }

        // Try to load draft for JAVASCRIPT if available, otherwise first available
        const preferredLang =
          missionData.languages?.find((l) => l.language === 'JAVASCRIPT') ||
          missionData.languages?.[0];
        const initialLang = preferredLang?.language || 'JAVASCRIPT';
        const displayLang = LANG_REVERSE_MAP[initialLang] || 'javascript';
        setLanguage(displayLang);

        const draftData = await getDraft(missionId, initialLang);
        let code = '';
        if (draftData.hasSavedCode) {
          code = draftData.code;
        } else {
          // Use starter code
          code = missionData.languages.find((l) => l.language === initialLang)?.starterCode || '';
        }
        setLastSavedCode(code);
        setCurrentCode(code);

        // Set initial test case input from the first public test case
        if (missionData.publicTestCases && missionData.publicTestCases.length > 0) {
          setTestCaseInput(missionData.publicTestCases[0].inputData || '');
        }

        setIsLoaded(true);
      } catch (err) {
        console.error('Failed to fetch mission data:', err);
        setOutput('Error: ' + mapErrorMessage(err));
      } finally {
        setIsLoading(false);
      }
    };

    if (missionId) {
      fetchMissionData();
    }
  }, [missionId]);

  // Use a ref for handleSave to avoid re-initializing the editor when handleSave changes
  const handleSaveRef = useRef(null);

  // Initialize Monaco Editor
  useEffect(() => {
    if (monacoContainerRef.current && isLoaded && !editorInstance.current) {
      editorInstance.current = monaco.editor.create(monacoContainerRef.current, {
        value: lastSavedCode,
        language: language,
        theme: 'vs-light',
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

      // Track code changes
      editorInstance.current.onDidChangeModelContent(() => {
        setCurrentCode(editorInstance.current.getValue());
      });

      // Add Save Command (Ctrl+S / Cmd+S)
      editorInstance.current.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyS, () => {
        handleSaveRef.current?.();
      });
    }

    return () => {
      // Cleanup if needed
    };
  }, [isLoaded, language, lastSavedCode]);

  // Handle Save
  const handleSave = useCallback(async () => {
    if (!editorInstance.current || isLoading) return;
    const code = editorInstance.current.getValue();
    if (code === lastSavedCode) return;

    try {
      setIsLoading(true);
      await saveDraft(missionId, language.toUpperCase(), code);
      setLastSavedCode(code);
    } catch (err) {
      console.error('Save failed:', err);
    } finally {
      setIsLoading(false);
    }
  }, [isLoading, lastSavedCode, missionId, language]);

  // Keep handleSaveRef updated
  useEffect(() => {
    handleSaveRef.current = handleSave;
  }, [handleSave]);

  // 코드 초기화 (Reset)
  const handleResetCode = useCallback(async () => {
    if (!mission || !language) return;

    const confirmReset = window.confirm(
      '코드를 초기 상태로 되돌리시겠습니까? 현재 작성 중인 내용은 사라집니다.',
    );
    if (!confirmReset) return;

    try {
      setIsLoading(true);

      // 현재 선택된 언어의 백엔드용 매핑 이름 확인 (예: javascript -> JAVASCRIPT)
      const backendLang = LANG_MAP[language] || language.toUpperCase();
      const starterCode =
        mission.languages.find((l) => l.language === backendLang)?.starterCode || '';

      // 서버의 드래프트 초기화
      await saveDraft(missionId, backendLang, starterCode);

      // 로컬 상태 및 에디터 동기화 (언어 상태는 유지)
      setLastSavedCode(starterCode);
      setCurrentCode(starterCode);

      if (editorInstance.current) {
        editorInstance.current.setValue(starterCode);
      }
    } catch (err) {
      console.error('Reset failed:', err);
    } finally {
      setIsLoading(false);
    }
  }, [mission, language, missionId]);

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

  const handleLanguageChange = async (e) => {
    const newLang = e.target.value; // 표시용 소문자 (e.g. 'javascript')
    const backendLang = LANG_MAP[newLang] || newLang.toUpperCase(); // API용 대문자 (e.g. 'JAVASCRIPT')
    const prevBackendLang = LANG_MAP[language] || language.toUpperCase();

    // Auto save previous language code before switching
    if (isDirty) {
      try {
        await saveDraft(missionId, prevBackendLang, currentCode);
      } catch (err) {
        console.warn('Auto-save failed during language switch', err);
      }
    }

    setLanguage(newLang);

    // Load draft or starter code for new language
    try {
      setIsLoading(true);
      const draftData = await getDraft(missionId, backendLang); // 대문자로 전달
      let code = '';
      if (draftData.hasSavedCode) {
        code = draftData.code;
      } else {
        // mission.languages 배열에서 대문자 언어명으로 매칭
        code = mission?.languages?.find((l) => l.language === backendLang)?.starterCode || '';
      }

      setLastSavedCode(code);
      setCurrentCode(code);

      if (editorInstance.current) {
        editorInstance.current.setValue(code);
        const model = editorInstance.current.getModel();
        monaco.editor.setModelLanguage(model, newLang); // Monaco에는 소문자로 전달
      }
    } catch (err) {
      console.error('Failed to load language draft:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRun = useCallback(async () => {
    if (!editorInstance.current) return;
    const code = editorInstance.current.getValue();

    setIsLoading(true);
    setOutput('Running code...\n');
    setErrorTabContent('');

    try {
      // Execute API will auto-save draft if missionId is provided
      const result = await executeCode({
        missionId,
        sourceCode: code,
        language,
        stdin: testCaseInput,
      });

      const { stdout, stderr, compileOutput, statusDescription } = result;

      if (stderr || compileOutput) {
        setErrorTabContent(stderr || compileOutput);
        setOutput(
          `Execution Result: ${statusDescription}\n\n[Error Output Available in Error Tab]`,
        );
      } else {
        const finalOutput =
          stdout !== undefined && stdout !== null && !Number.isNaN(stdout)
            ? stdout
            : 'Success (No output)';
        setOutput(finalOutput);
      }

      setLastSavedCode(code); // Update lastSavedCode since executeCode auto-saves
    } catch (err) {
      setOutput('Error: ' + mapErrorMessage(err));
    } finally {
      setIsLoading(false);
    }
  }, [language, missionId, testCaseInput]);


  const handleSubmit = useCallback(async () => {
    if (!editorInstance.current) return;
    const code = editorInstance.current.getValue();

    setIsLoading(true);
    setOutput('Submitting...\n');
    setErrorTabContent('');

    try {
      const result = await submitCode({
        missionId,
        sourceCode: code,
        language,
      });

      const { overallStatus, passedCount = 0, totalCount = 0, results = [] } = result;

      let resText = `Status: ${overallStatus}\nProgress: ${passedCount}/${totalCount} passed\n\n`;
      if (results && results.length > 0) {
        results.forEach((res, idx) => {
          resText += `Test Case ${idx + 1}: ${res.status}${res.hidden ? ' (Hidden)' : ''}\n`;
        });
      }

      setOutput(resText);
      setLastSavedCode(code); // submitCode auto-saves draft

      if (overallStatus === 'ACCEPTED') {
        await updateMissionProgress(missionId, 'COMPLETED');
        setMission((prev) => (prev ? { ...prev, userStatus: 'COMPLETED' } : prev));
      }
    } catch (err) {
      setOutput('Error: ' + mapErrorMessage(err));
    } finally {
      setIsLoading(false);
    }
  }, [language, missionId]);

  return (
    <div className="mission-page-container">
      <Gnb
        title="LearnCode"
        fluid={true}
        isLoggedIn={isAuthenticated}
        userName={user?.nickname || '사용자'}
        showBackButton
        onBackClick={() => navigate('/home')}
        onLogoutClick={() => dispatch(logoutAction())}
        onSettingsClick={() => console.log('Settings clicked')} // setIsMyPageOpen(true) 모달 복구 전까지 임시 주석 처리
      />

      <main className="mission-main-content">
        {/* Left: Problem Description */}
        <div className="panel-left" style={{ width: `${leftWidth}%` }}>
          {mission ? (
            <ProblemDescriptionPanel
              title={mission.title}
              difficulty={mission.difficulty}
              status={mission.userStatus}
              markdownContent={mission.description}
              examples={mission.publicTestCases?.map((tc) => ({
                input: tc.inputData,
                output: tc.expectedOutput,
              }))}
            />
          ) : (
            <div className="panel-loading">Loading mission...</div>
          )}
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
                    {mission?.languages?.map((lang) => (
                      <option
                        key={lang.language}
                        value={LANG_REVERSE_MAP[lang.language] || lang.language.toLowerCase()}
                      >
                        {lang.displayName}
                      </option>
                    )) || (
                      <>
                        <option value="python">Python</option>
                        <option value="javascript">JavaScript</option>
                        <option value="java">Java</option>
                        <option value="c">C</option>
                      </>
                    )}
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
              </div>

              <div className="editor-actions">
                <div
                  className={`save-status ${isLoading ? 'loading' : isDirty ? 'dirty' : 'saved'}`}
                >
                  {isLoading ? (
                    <span className="status-text">저장 중...</span>
                  ) : isDirty ? (
                    <span className="status-text">변경됨</span>
                  ) : (
                    <>
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="status-icon"
                      >
                        <path d="M20 6L9 17l-5-5" />
                      </svg>
                      <span className="status-text">저장됨</span>
                    </>
                  )}
                </div>

                <div className="toolbar-divider" />

                <button
                  type="button"
                  className="toolbar-action-btn"
                  onClick={handleSave}
                  disabled={isLoading || !isDirty}
                  title="코드 저장 (Ctrl+S)"
                >
                  <SaveIcon />
                  <span>저장</span>
                </button>

                <button
                  type="button"
                  className="toolbar-action-btn"
                  onClick={handleResetCode}
                  title="코드 초기화"
                  disabled={isLoading}
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                    <path d="M3 3v5h5" />
                  </svg>
                  <span>초기화</span>
                </button>

                <div className="toolbar-divider" />

                <button
                  type="button"
                  className="toolbar-action-btn run-btn"
                  onClick={handleRun}
                  disabled={isLoading}
                >
                  <RunIcon />
                  <span>테스트</span>
                </button>
                <button
                  type="button"
                  className="toolbar-action-btn submit-btn"
                  onClick={handleSubmit}
                  disabled={isLoading}
                >
                  <SubmitIcon />
                  <span>제출</span>
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
              testcase={testCaseInput}
              onTestcaseChange={setTestCaseInput}
              error={errorTabContent}
              isLoading={isLoading}
            />
          </div>
        </div>
      </main>

      <Footer />

      {/* 마이페이지 모달 (파일 복구 후 주석 해제 필요)
      <MyPageModal 
        isOpen={isMyPageOpen} 
        onClose={() => setIsMyPageOpen(false)} 
      />
      */}
    </div>
  );
};

export default MissionPage;
