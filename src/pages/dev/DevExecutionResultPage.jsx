import { useState } from 'react';
import ExecutionResultPanel from '../../components/mission/ExecutionResultPanel';
import '../../styles/pages/DevExecutionResultPage.css';

const MOCK_OUTPUT = `[stdout]\nHello, World!\n\n[Execution time: 32ms]`;
const MOCK_TESTCASE = `테스트케이스 1: nums = [2,7,11,15], target = 9\n예상 출력: [0,1]\n실제 출력: [0,1]\n✓ 통과\n\n테스트케이스 2: nums = [3,2,4], target = 6\n예상 출력: [1,2]\n실제 출력: [1,2]\n✓ 통과`;
const MOCK_ERROR = `RuntimeError: list index out of range\n  File "solution.py", line 5, in twoSum\n    return prevMap[diff]`;

export default function DevExecutionResultPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [output, setOutput] = useState('');
  const [testcase, setTestcase] = useState('');
  const [error, setError] = useState('');

  const simulateAsync = (callback, delay = 1500) => {
    setIsLoading(true);
    setTimeout(() => {
      callback();
      setIsLoading(false);
    }, delay);
  };

  const handleRun = () => {
    simulateAsync(() => {
      setOutput(MOCK_OUTPUT);
      setTestcase('');
      setError('');
    });
  };

  const handleTest = () => {
    simulateAsync(() => {
      setTestcase(MOCK_TESTCASE);
      setOutput('');
      setError('');
    });
  };

  const handleSubmit = () => {
    simulateAsync(() => {
      setError(MOCK_ERROR);
      setOutput('');
      setTestcase('');
    }, 2000);
  };

  return (
    <div className="dev-execution-result-page">
      <h1 className="dev-page-title">Dev: ExecutionResultPanel</h1>

      <section className="dev-section">
        <h2 className="dev-section-title">기본 상태 (비어있음)</h2>
        <ExecutionResultPanel
          onRun={() => console.log('run')}
          onTest={() => console.log('test')}
          onSubmit={() => console.log('submit')}
        />
      </section>

      <section className="dev-section">
        <h2 className="dev-section-title">인터랙티브 (버튼 클릭 → 결과 표시)</h2>
        <ExecutionResultPanel
          output={output}
          testcase={testcase}
          error={error}
          isLoading={isLoading}
          onRun={handleRun}
          onTest={handleTest}
          onSubmit={handleSubmit}
        />
      </section>

      <section className="dev-section">
        <h2 className="dev-section-title">로딩 상태 (버튼 비활성화)</h2>
        <ExecutionResultPanel
          isLoading={true}
          onRun={() => {}}
          onTest={() => {}}
          onSubmit={() => {}}
        />
      </section>
    </div>
  );
}
