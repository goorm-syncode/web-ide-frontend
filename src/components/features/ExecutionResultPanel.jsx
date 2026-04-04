import { useState } from 'react';
import Button from '../common/Button';
import '../../styles/features/ExecutionResultPanel.css';

const RunIcon = () => (
  <svg
    className="btn-icon"
    width="12"
    height="12"
    viewBox="0 0 12 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M2.5 1.5L10 6L2.5 10.5V1.5Z" fill="currentColor" />
  </svg>
);

const TestIcon = () => (
  <svg
    className="btn-icon"
    width="14"
    height="14"
    viewBox="0 0 14 14"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M2 3.5H9M2 7H7M2 10.5H5"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <path
      d="M9.5 8L11 9.5L13.5 7"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const TABS = [
  { key: 'output', label: 'Output' },
  { key: 'testcase', label: 'Testcase' },
  { key: 'error', label: 'Error' },
];

/**
 * 실행 결과 패널 컴포넌트
 * @param {Object} props
 * @param {string} [props.output] - Output 탭 출력 내용
 * @param {string} [props.testcase] - Testcase 탭 내용
 * @param {string} [props.error] - Error 탭 내용
 * @param {boolean} [props.isLoading=false] - 버튼 로딩/비활성화 상태
 * @param {Function} [props.onRun] - Run 버튼 클릭 핸들러
 * @param {Function} [props.onTest] - Test 버튼 클릭 핸들러
 * @param {Function} [props.onSubmit] - Submit 버튼 클릭 핸들러
 */
const ExecutionResultPanel = ({
  output = '',
  testcase = '',
  error = '',
  isLoading = false,
  onRun,
  onTest,
  onSubmit,
}) => {
  const [activeTab, setActiveTab] = useState('output');

  const contentMap = {
    output,
    testcase,
    error,
  };

  const currentContent = contentMap[activeTab];
  const isEmpty = !currentContent;

  return (
    <div className="execution-panel">
      <div className="panel-header">
        <div className="panel-tabs">
          {TABS.map((tab) => (
            <button
              key={tab.key}
              className={`panel-tab ${activeTab === tab.key ? 'panel-tab--active' : ''}`}
              onClick={() => setActiveTab(tab.key)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="panel-actions">
          <Button
            type="secondary"
            disabled={isLoading}
            onClick={onRun}
            id="btn-run"
          >
            <RunIcon />
            Run
          </Button>
          <Button
            type="secondary"
            disabled={isLoading}
            onClick={onTest}
            id="btn-test"
          >
            <TestIcon />
            Test
          </Button>
          <Button
            primary
            loading={isLoading}
            onClick={onSubmit}
            id="btn-submit"
          >
            Submit
          </Button>
        </div>
      </div>

      <div className="panel-content">
        {isEmpty ? (
          <p className="panel-placeholder">
            Ready to execute. Click &apos;Run&apos; to see results here.
          </p>
        ) : (
          <pre className="panel-output">{currentContent}</pre>
        )}
      </div>
    </div>
  );
};

export default ExecutionResultPanel;
