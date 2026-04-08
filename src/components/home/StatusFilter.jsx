import { useState, useRef, useEffect } from 'react';
import '../../styles/components/home/StatusFilter.css';

/**
 * 상태 필터 옵션 목록
 * value는 백엔드 API 파라미터와 동일하게 정의
 */
const STATUS_OPTIONS = [
  { label: '전체', value: 'all', dotClass: 'status-filter__dot--all' },
  {
    label: '미해결',
    value: 'unattempted',
    dotClass: 'status-filter__dot--unattempted',
  },
  {
    label: '진행 중',
    value: 'in_progress',
    dotClass: 'status-filter__dot--in-progress',
  },
  { label: '완료', value: 'solved', dotClass: 'status-filter__dot--solved' },
];

/**
 * 상태 필터 콤보박스 컴포넌트
 *
 * @param {Object}   props
 * @param {string}   [props.value]     - 외부에서 제어할 경우 선택된 status 값
 * @param {Function} [props.onChange]  - 선택 변경 시 호출 (value 전달)
 *
 * @example
 * // 비제어 모드 (내부 상태 관리)
 * <StatusFilter />
 *
 * @example
 * // 제어 모드 (외부 상태 연결)
 * const [status, setStatus] = useState('all');
 * <StatusFilter value={status} onChange={setStatus} />
 */
const StatusFilter = ({ value, onChange }) => {
  const [internalValue, setInternalValue] = useState('all');
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  // 제어/비제어 모드 통합
  const selected = value !== undefined ? value : internalValue;
  const selectedOption =
    STATUS_OPTIONS.find((opt) => opt.value === selected) || STATUS_OPTIONS[0];

  // 항목 선택 처리
  const handleSelect = (optionValue) => {
    if (value === undefined) {
      setInternalValue(optionValue);
    }
    if (onChange) {
      onChange(optionValue);
    }
    setIsOpen(false);
  };

  // 외부 클릭 시 드롭다운 닫기
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // ESC 키 누르면 닫기
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="status-filter" ref={containerRef}>
      {/* 외부 레이블 — 버튼과 독립 */}
      <span className="status-filter__label">상태:</span>

      {/* 트리거 버튼 — 선택값 + 화살표 */}
      <button
        type="button"
        className={`status-filter__trigger${isOpen ? ' status-filter__trigger--open' : ''}`}
        onClick={() => setIsOpen((prev) => !prev)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-label={`상태 필터: ${selectedOption.label} 선택됨`}
      >
        <span className="status-filter__trigger-value">
          {selectedOption.label}
        </span>
        {/* 화살표 아이콘 (SVG) */}
        <svg
          className="status-filter__arrow"
          viewBox="0 0 16 16"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M4 6l4 4 4-4"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {/* 드롭다운 패널 */}
      {isOpen && (
        <ul
          className="status-filter__dropdown"
          role="listbox"
          aria-label="상태 필터 옵션"
        >
          {STATUS_OPTIONS.map((option) => {
            const isSelected = selected === option.value;
            return (
              <li key={option.value} role="none">
                <button
                  type="button"
                  role="option"
                  aria-selected={isSelected}
                  className={`status-filter__option${isSelected ? ' status-filter__option--selected' : ''}`}
                  onClick={() => handleSelect(option.value)}
                >
                  <span
                    className={`status-filter__dot ${option.dotClass}`}
                    aria-hidden="true"
                  />
                  {option.label}
                  {/* 선택된 항목 체크마크 */}
                  {isSelected && (
                    <svg
                      className="status-filter__check"
                      viewBox="0 0 14 14"
                      fill="none"
                      aria-hidden="true"
                    >
                      <path
                        d="M2 7l3.5 3.5L12 3"
                        stroke="currentColor"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default StatusFilter;
