import React from 'react';
import PropTypes from 'prop-types';
import Card from '../common/Card';
import Button from '../common/Button';
import TagBadge from '../common/TagBadge';
import '../../styles/components/home/ProblemCard.css';

/**
 * 코딩테스트 문제 카드 컴포넌트
 * @param {Object} props
 * @param {'solved'|'in_progress'|'unattempted'} props.status - 문제 진행 상태
 * @param {string} props.category - 문제 분류 (예: ARRAY & HASHING)
 * @param {string} props.title - 문제 제목
 * @param {string} [props.description] - 문제 설명
 * @param {'EASY'|'MEDIUM'|'HARD'} props.difficulty - 문제 난이도
 * @param {string[]} [props.tags] - 추가 관련 속성 태그
 * @param {Function} [props.onClickAction] - 하단 액션 버튼 클릭 핸들러
 */
const ProblemCard = ({
  status = 'unattempted',
  category,
  title,
  description,
  difficulty,
  tags = [],
  onClickAction,
}) => {
  // 난이도에 따른 뱃지 타입 맵핑
  const getDifficultyType = (level) => {
    switch (level) {
      case 'EASY':
        return 'success';
      case 'MEDIUM':
        return 'warning';
      case 'HARD':
        return 'error';
      default:
        return 'default';
    }
  };

  // 난이도 한글 변환
  const getDifficultyText = (level) => {
    switch (level) {
      case 'EASY':
        return 'Easy';
      case 'MEDIUM':
        return 'Medium';
      case 'HARD':
        return 'Hard';
      default:
        return level;
    }
  };

  const renderStatus = () => {
    const statusMap = {
      solved: { text: '완료', colorClass: 'solved', showDot: true },
      in_progress: { text: '진행 중', colorClass: 'in_progress', showDot: true },
      unattempted: { text: '미해결', colorClass: 'unattempted', showDot: true },
    };

    const currentStatus = statusMap[status] || statusMap.unattempted;

    return (
      <div className={`problem-status ${currentStatus.colorClass}`}>
        {currentStatus.showDot && <span className={`status-dot ${currentStatus.colorClass}`} />}
        {currentStatus.text}
      </div>
    );
  };

  const handleButtonClick = (e) => {
    e.stopPropagation();
    if (onClickAction) onClickAction();
  };

  const renderButton = () => {
    const buttonTextMap = {
      solved: '코드 리뷰',
      in_progress: '이어서 풀기',
      unattempted: '문제 풀기',
    };

    const getButtonStyle = () => {
      switch (status) {
        case 'unattempted':
          return { primary: false, className: 'problem-btn-soft' };
        case 'in_progress':
          return { primary: true, className: '' };
        case 'solved':
          return { primary: false, className: 'problem-btn-light' };
        default:
          return { primary: true, className: '' };
      }
    };

    const { primary, className } = getButtonStyle();

    return (
      <Button
        type="button"
        primary={primary}
        className={`${className} problem-card-btn`.trim()}
        fullWidth
        onClick={handleButtonClick}
      >
        {buttonTextMap[status] || '문제 풀기'}
      </Button>
    );
  };

  return (
    <Card className="problem-card-container" onClick={onClickAction}>
      <div className="problem-card-content">
        <div className="problem-top-group">
          <div className="problem-card-header">
            <span className="problem-category">{category}</span>
            {renderStatus()}
          </div>

          <div className="problem-body">
            <h3 className="problem-title">{title}</h3>
            <p className="problem-description">{description}</p>
          </div>
        </div>

        <div className="problem-footer-section">
          <div className="problem-tags">
            {difficulty && (
              <TagBadge type={getDifficultyType(difficulty)} text={getDifficultyText(difficulty)} />
            )}
            {tags.map((tag, idx) => (
              <TagBadge key={idx} text={tag} />
            ))}
          </div>

          <div className="problem-footer-button">{renderButton()}</div>
        </div>
      </div>
    </Card>
  );
};

ProblemCard.propTypes = {
  status: PropTypes.oneOf(['solved', 'in_progress', 'unattempted']),
  category: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  difficulty: PropTypes.oneOf(['EASY', 'MEDIUM', 'HARD']).isRequired,
  tags: PropTypes.arrayOf(PropTypes.string),
  onClickAction: PropTypes.func,
};

export default ProblemCard;
