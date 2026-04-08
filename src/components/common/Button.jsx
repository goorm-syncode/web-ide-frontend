import React from 'react';
import PropTypes from 'prop-types';
import '../../styles/components/common/Button.css';

/**
 * 공통 버튼 컴포넌트
 * @param {Object} props
 * @param {React.ReactNode} props.children - 버튼 내부 요소
 * @param {'button' | 'submit' | 'reset' | 'secondary' | 'danger' | 'primary' | 'info'} [props.type='button'] - 버튼 타입
 * @param {boolean} [props.primary=false] - 프라이머리 스타일
 * @param {boolean} [props.fullWidth=false] - 전체 너비 여부
 * @param {boolean} [props.loading=false] - 로딩 상태
 * @param {boolean} [props.disabled=false] - 비활성화 상태
 * @param {Function} [props.onClick] - 클릭 핸들러
 * @param {string} [props.className=''] - 추가 클래스명
 */
const Button = ({
  children,
  type = 'button',
  primary = false,
  fullWidth = false,
  loading = false,
  disabled = false,
  onClick,
  className = '',
  ...props
}) => {
  const isDisabled = disabled || loading;

  const btnType = primary ? 'primary' : type === 'button' ? 'primary' : type;

  return (
    <button
      type={type === 'button' || type === 'submit' || type === 'reset' ? type : 'button'}
      className={`btn btn-${btnType} ${fullWidth ? 'btn-fullWidth' : ''} ${loading ? 'btn-loading' : ''} ${className}`}
      disabled={isDisabled}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  type: PropTypes.oneOf(['button', 'submit', 'reset', 'secondary', 'danger', 'primary', 'info']),
  primary: PropTypes.bool,
  fullWidth: PropTypes.bool,
  loading: PropTypes.bool,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  className: PropTypes.string,
};

export default Button;
