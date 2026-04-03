import { useState } from 'react';
import '../../styles/features/ExecutionResultPanel.css';

const TABS = [
  { key: 'output', label: 'Output' },
  { key: 'testcase', label: 'Testcase' },
  { key: 'error', label: 'Error' },
];

function ExecutionResultPanel({ status = 'idle' }) {
  const [activeTab, setActiveTab] = useState('output');

  return (
    <div className="execution-result-panel">
      <div className="panel-tabs">
        {TABS.map((tab) => (
          <button
            key={tab.key}
            id={`panel-tab-${tab.key}`}
            className={`panel-tab${activeTab === tab.key ? ' active' : ''}`}
            onClick={() => setActiveTab(tab.key)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="panel-content">
        {status === 'idle' && (
          <p className="panel-idle-message">
            Ready to execute. Click &apos;Run&apos; to see results here.
          </p>
        )}
      </div>
    </div>
  );
}

export default ExecutionResultPanel;
