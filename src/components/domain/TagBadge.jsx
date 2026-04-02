import '../../styles/components/TagBadge.css';

/**
 * 문제 난이도 및 분류를 나타내는 태그 컴포넌트
 * @param {Object} props
 * @param {'success'|'warning'|'error'|'default'} [props.type='default'] - 태그의 역할 및 색상 (성공=쉬움, 경고=보통, 에러=어려움)
 * @param {string} props.text - 태그 위 텍스트 
 */
const TagBadge = ({ type = 'default', text }) => {
  return (
    <span className={`tag-badge tag-badge-${type}`}>
      {text}
    </span>
  );
};

export default TagBadge;
