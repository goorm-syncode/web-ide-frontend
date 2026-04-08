import { useState } from 'react';
import '../../styles/components/home/DifficultyFilter.css';

const DIFFICULTY_OPTIONS = [
  { label: '전체', value: 'all' },
  { label: '쉬움', value: 'easy' },
  { label: '보통', value: 'medium' },
  { label: '어려움', value: 'hard' },
];

/**
 * 난이도 필터 컴포넌트
 * @param {Object} props
 * @param {string} [props.value] - 외부에서 제어할 경우 선택된 값
 * @param {Function} [props.onChange] - 선택 변경 시 호출되는 콜백 (value 전달)
 */
const DifficultyFilter = ({ value, onChange }) => {
  const [internalValue, setInternalValue] = useState('all');

  const selected = value !== undefined ? value : internalValue;

  const handleSelect = (optionValue) => {
    if (value === undefined) {
      setInternalValue(optionValue);
    }
    if (onChange) {
      onChange(optionValue);
    }
  };

  return (
    <div className="difficulty-filter" role="radiogroup" aria-label="난이도 필터">
      {DIFFICULTY_OPTIONS.map((option) => (
        <button
          key={option.value}
          type="button"
          role="radio"
          aria-checked={selected === option.value}
          className={`difficulty-filter__btn${selected === option.value ? ' difficulty-filter__btn--active' : ''}`}
          onClick={() => handleSelect(option.value)}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
};

export default DifficultyFilter;
