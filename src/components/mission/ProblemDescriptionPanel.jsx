import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ReactMarkdown from 'react-markdown';
import TagBadge from '../common/TagBadge';
import '../../styles/components/mission/ProblemDescriptionPanel.css';

const RenderFormattedCode = ({ text, isInline }) => {
  if (isInline) {
    return <code>{text}</code>;
  }

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
        {lineIdx < lines.length - 1 && (
          <span className="newline-indicator">↵</span>
        )}
      </span>
    );
  });

  return (
    <code className="formatted-code-block" data-raw-content={text}>
      {formattedContent}
    </code>
  );
};

RenderFormattedCode.propTypes = {
  text: PropTypes.string.isRequired,
  isInline: PropTypes.bool,
};

const STATUS_MAP = {
  NOT_STARTED: { text: '미해결', type: 'todo' },
  IN_PROGRESS: { text: '진행 중', type: 'inprogress' },
  COMPLETED: { text: '완료', type: 'solved' },
};

const ProblemDescriptionPanel = ({
  title,
  difficulty,
  status,
  markdownContent,
  examples = [],
}) => {
  const [copyStatus, setCopyStatus] = useState({});

  const handleCopy = (text, id) => {
    const copyToClipboard = (str) => {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        return navigator.clipboard.writeText(str);
      } else {
        // Fallback to older method
        const textarea = document.createElement('textarea');
        textarea.value = str;
        textarea.className = 'copy-fallback-textarea';
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

    copyToClipboard(text).then(() => {
      setCopyStatus((prev) => ({ ...prev, [id]: true }));
      setTimeout(() => {
        setCopyStatus((prev) => ({ ...prev, [id]: false }));
      }, 2000);
    }).catch(err => {
      console.error('Copy failed:', err);
    });
  };

  const renderCode = ({ inline, children }) => {
    const textContent = Array.isArray(children) ? children.join('') : String(children || '');
    return <RenderFormattedCode text={textContent} isInline={inline} />;
  };

  const renderPre = ({ children }) => {
    const codeElement = React.Children.toArray(children).find(
      (child) => child.type === RenderFormattedCode || (child.props && child.props.text !== undefined)
    );
    const rawContent = codeElement?.props?.text || '';
    const boxId = Math.random().toString(36).substr(2, 9);

    return (
      <span className="example-box-wrapper">
        <button 
          className={`copy-button ${copyStatus[boxId] ? 'copied' : ''}`}
          onClick={() => handleCopy(rawContent, boxId)}
          title="Copy to clipboard"
        >
          {copyStatus[boxId] ? 'Copied!' : (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14">
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
            </svg>
          )}
        </button>
        <pre className="example-box-pre">{children}</pre>
      </span>
    );
  };

  const renderDifficultyTag = (diff) => {
    let type = 'default';
    const d = diff.toUpperCase();
    let text = d;
    switch (d) {
      case 'EASY': case '쉬움': 
        type = 'success'; text = 'Easy'; break;
      case 'MEDIUM': case '보통': 
        type = 'warning'; text = 'Medium'; break;
      case 'HARD': case '어려움': 
        type = 'error'; text = 'Hard'; break;
    }
    return <TagBadge type={type} text={text} />;
  };

  const renderStatusTag = (st) => {
    if (!st) return null;
    const key = st.toUpperCase().replace(/\s+/g, '_');
    const config = STATUS_MAP[key] || { text: st, type: 'default' };
    return <TagBadge type={config.type} text={config.text} />;
  };

  return (
    <div className="problem-description-wrapper">
      <div className="panel-header">
        <h1 className="problem-title">{title}</h1>
        <div className="header-tags">
          {difficulty && renderDifficultyTag(difficulty)}
          {status && renderStatusTag(status)}
        </div>
      </div>
      <div className="panel-content">
        <ReactMarkdown components={{ code: renderCode, pre: renderPre }}>
          {markdownContent}
        </ReactMarkdown>

        {examples && examples.length > 0 && (
          <div className="explicit-examples">
            {examples.map((ex, index) => {
              const fullText = `입력: ${ex.input}\n출력: ${ex.output}${ex.explanation ? `\n설명: ${ex.explanation}` : ''}`;
              const boxId = `ex-${index}`;
              return (
                <div key={index} className="example-item">
                  <h3 className="example-title">{ex.title || `예제 ${index + 1}`}</h3>
                  <span className="example-box-wrapper">
                    <button 
                      className={`copy-button ${copyStatus[boxId] ? 'copied' : ''}`}
                      onClick={() => handleCopy(fullText, boxId)}
                    >
                      {copyStatus[boxId] ? 'Copied!' : (
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14">
                          <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                        </svg>
                      )}
                    </button>
                    <pre className="example-box-pre">
                      <RenderFormattedCode text={fullText} isInline={false} />
                    </pre>
                  </span>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

ProblemDescriptionPanel.propTypes = {
  title: PropTypes.string.isRequired,
  difficulty: PropTypes.string,
  status: PropTypes.string,
  markdownContent: PropTypes.string.isRequired,
  examples: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      title: PropTypes.string,
      input: PropTypes.string,
      output: PropTypes.string,
      explanation: PropTypes.string,
    }),
  ),
};

export default ProblemDescriptionPanel;
