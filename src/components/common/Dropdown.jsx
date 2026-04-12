import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import '../../styles/components/common/Dropdown.css';

/**
 * 전역에서 재사용 가능한 프리미엄 드롭다운 컴포넌트
 *
 * @param {Object}   props
 * @param {ReactNode} props.trigger       - 드롭다운을 열고 닫는 트리거 엘리먼트 (보통 버튼)
 * @param {Array}     props.options       - 옵션 목록 [{ label, value, dotClass, icon }]
 * @param {string}    props.value         - 현재 선택된 값
 * @param {Function}  props.onChange      - 값이 변경될 때 호출되는 콜백
 * @param {string}    props.ariaLabel     - 스크린 리더용 라벨
 * @param {string}    props.panelClassName - 패널 추가 스타일 클래스
 */
const Dropdown = ({
  trigger,
  options = [],
  value,
  onChange,
  ariaLabel = 'options',
  panelClassName = '',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  const toggleDropdown = () => setIsOpen((prev) => !prev);
  const closeDropdown = () => setIsOpen(false);

  const handleSelect = (optionValue) => {
    if (onChange) {
      onChange(optionValue);
    }
    closeDropdown();
  };

  // 외부 클릭 감지
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        closeDropdown();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // ESC 키 감지
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') closeDropdown();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="common-dropdown" ref={containerRef}>
      {/* 트리거 버튼 렌더링 (isOpen 상태 주입) */}
      {React.cloneElement(trigger, {
        onClick: (e) => {
          if (trigger.props.onClick) trigger.props.onClick(e);
          toggleDropdown();
        },
        'aria-expanded': isOpen,
        className: `${trigger.props.className || ''}${isOpen ? ' is-active' : ''}`,
      })}

      {/* 드롭다운 패널 */}
      {isOpen && (
        <div className={`common-dropdown__panel ${panelClassName}`}>
          <ul className="common-dropdown__list" role="listbox" aria-label={ariaLabel}>
            {options.map((option) => {
              const isSelected = value === option.value;
              return (
                <li key={option.value} role="none">
                  <button
                    type="button"
                    role="option"
                    aria-selected={isSelected}
                    className={`common-dropdown__option${
                      isSelected ? ' common-dropdown__option--selected' : ''
                    }`}
                    onClick={() => handleSelect(option.value)}
                  >
                    {/* 선택적 인디케이터 (Dot) */}
                    {option.dotClass && (
                      <span className={`dropdown-dot ${option.dotClass}`} aria-hidden="true" />
                    )}

                    {/* 선택적 아이콘 */}
                    {option.icon && <span className="common-dropdown__icon">{option.icon}</span>}

                    <span className="common-dropdown__label">{option.label}</span>

                    {/* 체크마크 */}
                    {isSelected && (
                      <svg
                        className="common-dropdown__check"
                        viewBox="0 0 14 14"
                        fill="none"
                        aria-hidden="true"
                      >
                        <path
                          d="M2 7l3.5 3.5L12 3"
                          stroke="currentColor"
                          strokeWidth="2"
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
        </div>
      )}
    </div>
  );
};

Dropdown.propTypes = {
  trigger: PropTypes.element.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.any.isRequired,
      dotClass: PropTypes.string,
      icon: PropTypes.node,
    }),
  ),
  value: PropTypes.any,
  onChange: PropTypes.func,
  ariaLabel: PropTypes.string,
  panelClassName: PropTypes.string,
};

export default Dropdown;
