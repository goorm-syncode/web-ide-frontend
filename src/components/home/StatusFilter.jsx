import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Dropdown from '../common/Dropdown';
import '../../styles/components/home/StatusFilter.css';

/**
 * 상태 필터 옵션 목록
 */
const STATUS_OPTIONS = [
  { label: '전체', value: 'ALL', dotClass: 'status-filter__dot--all' },
  {
    label: '미해결',
    value: 'NOT_STARTED',
    dotClass: 'status-filter__dot--unattempted',
  },
  {
    label: '진행 중',
    value: 'IN_PROGRESS',
    dotClass: 'status-filter__dot--in-progress',
  },
  { label: '완료', value: 'COMPLETED', dotClass: 'status-filter__dot--solved' },
];

/**
 * 상태 필터 콤보박스 컴포넌트 (공용 Dropdown 기반)
 */
const StatusFilter = ({ value, onChange }) => {
  const [internalValue, setInternalValue] = useState('ALL');

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
  };

  // 트리거 버튼 정의
  const trigger = (
    <button
      type="button"
      className="status-filter__trigger"
      aria-label={`상태 필터: ${selectedOption.label} 선택됨`}
    >
      <span className="status-filter__trigger-value">{selectedOption.label}</span>
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
  );

  return (
    <div className="status-filter">
      <span className="status-filter__label">상태:</span>
      <div className="status-filter__control">
        <Dropdown
          trigger={trigger}
          options={STATUS_OPTIONS}
          value={selected}
          onChange={handleSelect}
          ariaLabel="상태 필터 옵션"
        />
      </div>
    </div>
  );
};

StatusFilter.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
};

export default StatusFilter;
