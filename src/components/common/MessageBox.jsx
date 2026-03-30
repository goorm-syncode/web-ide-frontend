import React from 'react';
import '../../styles/components/MessageBox.css';

/**
 * Success Icon (Checkmark)
 */
const SuccessIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <polyline points="22 4 12 14.01 9 11.01" />
  </svg>
);

/**
 * Warning Icon (Exclamation Triangle)
 */
const WarningIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
    <line x1="12" y1="9" x2="12" y2="13" />
    <line x1="12" y1="17" x2="12.01" y2="17" />
  </svg>
);

/**
 * Error Icon (X Circle)
 */
const ErrorIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10" />
    <line x1="15" y1="9" x2="9" y2="15" />
    <line x1="9" y1="9" x2="15" y2="15" />
  </svg>
);

/**
 * 공통 메시지 박스 컴포넌트
 * @param {Object} props
 * @param {'success' | 'warning' | 'error'} [props.type='error'] - 메시지 타입
 * @param {boolean} [props.showIcon=true] - 아이콘 표시 여부
 * @param {React.ReactNode} props.children - 메시지 내용
 * @param {string} [props.className=''] - 추가 클래스명
 */
const MessageBox = ({ type = 'error', showIcon = true, children, className = '', ...props }) => {
  const getIcon = () => {
    switch (type) {
      case 'success':
        return <SuccessIcon />;
      case 'warning':
        return <WarningIcon />;
      case 'error':
      default:
        return <ErrorIcon />;
    }
  };

  return (
    <div className={`message-box message-box-${type} ${className}`} role="alert" {...props}>
      {showIcon && <div className="message-box-icon">{getIcon()}</div>}
      <div className="message-box-content">{children}</div>
    </div>
  );
};

export default MessageBox;
