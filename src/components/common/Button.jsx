import React from 'react';
import '../../styles/components/Button.css';

/**
 * 공통 버튼 컴포넌트
 * @param {Object} props
 * @param {React.ReactNode} props.children - 버튼 내부 요소
 * @param {'primary' | 'secondary' | 'danger'} [props.type='primary'] - 버튼 타입
 * @param {boolean} [props.loading=false] - 로딩 상태
 * @param {boolean} [props.disabled=false] - 비활성화 상태
 * @param {Function} [props.onClick] - 클릭 핸들러
 * @param {string} [props.className=''] - 추가 클래스명
 */
const Button = ({
  children,
  type = 'primary',
  loading = false,
  disabled = false,
  onClick,
  className = '',
  ...props
}) => {
  const isDisabled = disabled || loading;

  return (
    <button
      type="button"
      className={`btn btn-${type} ${loading ? 'btn-loading' : ''} ${className}`}
      disabled={isDisabled}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
