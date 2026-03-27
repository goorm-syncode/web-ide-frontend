import React from 'react';
import '../../styles/components/Card.css';

/**
 * 공통 카드 컴포넌트
 * @param {Object} props
 * @param {React.ReactNode} props.children - 카드 내부 콘텐츠
 * @param {string} [props.title] - 카드 제목 (선택 사항)
 * @param {string} [props.className=''] - 추가 클래스명
 * @param {Function} [props.onClick] - 클릭 핸들러
 * @param {boolean} [props.hoverable=false] - 호버 효과 여부
 */
const Card = ({ children, title, className = '', onClick, hoverable = false, ...props }) => {
  const handleClick = (e) => {
    if (onClick) {
      onClick(e);
    }
  };

  return (
    <div
      className={`card ${hoverable ? 'card-hoverable' : ''} ${className}`.trim()}
      onClick={handleClick}
      {...props}
    >
      {title && (
        <div className="card-header">
          <h3 className="card-title">{title}</h3>
        </div>
      )}
      <div className="card-content">{children}</div>
    </div>
  );
};

export default Card;
