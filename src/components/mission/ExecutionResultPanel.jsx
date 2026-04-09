import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import '../../styles/components/mission/ExecutionResultPanel.css';



const CopyIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    width="14"
    height="14"
  >
    <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
  </svg>
);



const RenderFormattedCode = ({ text }) => {
  const lines = text.split('\n');
  const formattedContent = lines.map((line, lineIdx) => {
    const chars = line.split('').map((char, charIdx) => {
      if (char === ' ') {
        return (
          <span key={`s-${lineIdx}-${charIdx}`} className="space-indicator">
            ·
          </span>
        );
      }
      if (char === '\t') {
        return (
          <span key={`t-${lineIdx}-${charIdx}`} className="tab-indicator">
            ⇥
          </span>
        );
      }
      return char;
    });

    return (
      <span key={lineIdx} className="code-line">
        {chars}
        {lineIdx < lines.length - 1 && <span className="newline-indicator">↵</span>}
      </span>
    );
  });

  return <div className="formatted-code-container">{formattedContent}</div>;
};

RenderFormattedCode.propTypes = {
  text: PropTypes.string.isRequired,
};

const TABS = [
  { key: 'output', label: '출력' },
  { key: 'testcase', label: '입력' },
];

const ExecutionResultPanel = ({
  output = '',
  testcase = '',
  error = '',
  onTestcaseChange,
}) => {
  const [activeTab, setActiveTab] = useState('output');
  const [copyStatus, setCopyStatus] = useState(false);
  const scrollRef = useRef(null);

  const contentMap = {
    output,
    testcase,
    error,
  };

  const currentContent = contentMap[activeTab];
  const isEmpty = !currentContent;

  // 자동 스크롤 로직: 컨텐츠가 변경 되거나 탭이 전환될 때 최하단으로 이동
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [currentContent, activeTab]);

  const handleCopy = () => {
    if (isEmpty) return;

    const copyToClipboard = (str) => {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        return navigator.clipboard.writeText(str);
      } else {
        const textarea = document.createElement('textarea');
        textarea.value = str;
        textarea.style.position = 'fixed';
        textarea.style.top = '-9999px';
        document.body.appendChild(textarea);
        textarea.select();
        try {
          document.execCommand('copy');
          document.body.removeChild(textarea);
          return Promise.resolve();
        } catch (e) {
          document.body.removeChild(textarea);
          return Promise.reject(e);
        }
      }
    };

    copyToClipboard(currentContent)
      .then(() => {
        setCopyStatus(true);
        setTimeout(() => setCopyStatus(false), 2000);
      })
      .catch((err) => {
        console.error('Copy failed:', err);
      });
  };

  return (
    <div className="execution-panel">
      <div className="panel-header">
        <div className="panel-tabs">
          {TABS.map((tab) => (
            <button
              type="button"
              key={tab.key}
              className={`panel-tab ${activeTab === tab.key ? 'panel-tab--active' : ''}`}
              onClick={() => setActiveTab(tab.key)}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="panel-body-container">
        {!isEmpty && activeTab !== 'testcase' && (
          <button
            type="button"
            className={`copy-button ${copyStatus ? 'copied' : ''}`}
            onClick={handleCopy}
            title="Copy results"
          >
            {copyStatus ? 'Copied!' : <CopyIcon />}
          </button>
        )}
        <div ref={scrollRef} className={`panel-content ${isEmpty ? 'panel-content--empty' : ''}`}>
          {isEmpty && activeTab !== 'testcase' ? (
            <p className="panel-placeholder">&apos;테스트&apos; 버튼을 눌러 결과를 확인하세요.</p>
          ) : activeTab === 'testcase' ? (
            <textarea
              className="testcase-textarea"
              value={testcase}
              onChange={(e) => onTestcaseChange?.(e.target.value)}
              placeholder="Enter test input here..."
              spellCheck="false"
            />
          ) : (
            <div className="result-container">
              <pre className="panel-output">
                <RenderFormattedCode text={currentContent} />
              </pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

ExecutionResultPanel.propTypes = {
  output: PropTypes.string,
  testcase: PropTypes.string,
  error: PropTypes.string,
  onTestcaseChange: PropTypes.func.isRequired,
};

export default ExecutionResultPanel;
