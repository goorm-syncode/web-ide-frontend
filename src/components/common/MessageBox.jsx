import React from 'react';
import PropTypes from 'prop-types';
import Button from './Button';
import '../../styles/components/common/MessageBox.css';

/**
 * 상태별 아이콘 렌더링
 */
const renderIcon = (type) => {
  switch (type) {
    case 'success':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
          <polyline points="22 4 12 14.01 9 11.01" />
        </svg>
      );
    case 'warning':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
          <line x1="12" y1="9" x2="12" y2="13" />
          <line x1="12" y1="17" x2="12.01" y2="17" />
        </svg>
      );
    case 'error':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <line x1="15" y1="9" x2="9" y2="15" />
          <line x1="9" y1="9" x2="15" y2="15" />
        </svg>
      );
    case 'info':
    default:
      // info 타입은 선택적으로 아이콘을 생략하거나 기본 아이콘을 넣습니다.
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="16" x2="12" y2="12" />
          <line x1="12" y1="8" x2="12.01" y2="8" />
        </svg>
      );
  }
};

/**
 * 공통 모달 메시지 박스 컴포넌트
 * @param {Object} props
 * @param {boolean} props.isOpen - 모달 열림 상태
 * @param {Function} props.onClose - 모달 닫기 핸들러
 * @param {string} props.title - 경고창 제목
 * @param {React.ReactNode} props.children - 본문 메시지
 * @param {'info' | 'success' | 'warning' | 'error'} [props.type='info'] - 상태 타입 (에이전트 컬러 지침 반영)
 * @param {boolean} [props.showIcon=true] - 제목 옆 아이콘 표시 여부 (기본값 true이나, 단순 info 모달에서는 강제 숨김 가능)
 * @param {Function} [props.onConfirm] - 확인 버튼 클릭 핸들러 (없으면 onClose 실행)
 * @param {string} [props.confirmText='확인'] - 확인 버튼 텍스트
 * @param {boolean} [props.showCancel=false] - 취소 버튼 표시 여부
 * @param {Function} [props.onCancel] - 취소 버튼 핸들러 (없으면 onClose 실행)
 * @param {string} [props.cancelText='취소'] - 취소 버튼 텍스트
 */
const MessageBox = ({
  isOpen = false,
  onClose,
  title,
  children,
  type = 'info',
  showIcon = true,
  onConfirm,
  confirmText = '확인',
  showCancel = false,
  onCancel,
  cancelText = '취소',
}) => {
  if (!isOpen) return null;

  // error 타입일 경우 사용자의 요청에 따라 다시 위험(danger) 색상(#EF4444)을 사용합니다.
  const confirmBtnType = type === 'error' ? 'danger' : 'primary';

  return (
    <div className="message-box-overlay">
      <div className={`message-box-container message-box-${type}`} role="dialog" aria-modal="true">
        <div className="message-box-header">
          {showIcon && (
            <span className="message-box-icon">
              {renderIcon(type)}
            </span>
          )}
          {title && <h3 className="message-box-title">{title}</h3>}
        </div>
        
        <div className={`message-box-body ${showIcon && title ? 'with-icon-padding' : ''}`}>
          {children}
        </div>
        
        <div className="message-box-actions">
          {showCancel && (
            <Button type="secondary" onClick={onCancel || onClose}>
              {cancelText}
            </Button>
          )}
          <Button type={confirmBtnType} onClick={onConfirm || onClose}>
            {confirmText}
          </Button>
        </div>
      </div>
    </div>
  );
};

MessageBox.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string,
  children: PropTypes.node,
  type: PropTypes.oneOf(['info', 'success', 'warning', 'error']),
  showIcon: PropTypes.bool,
  onConfirm: PropTypes.func,
  confirmText: PropTypes.string,
  showCancel: PropTypes.bool,
  onCancel: PropTypes.func,
  cancelText: PropTypes.string,
};

export default MessageBox;
