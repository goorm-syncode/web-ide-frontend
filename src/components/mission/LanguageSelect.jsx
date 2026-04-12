import React from 'react';
import PropTypes from 'prop-types';
import Dropdown from '../common/Dropdown';
import '../../styles/pages/MissionPage.css'; // 미션 페이지 버튼 스타일을 위해

const LanguageSelect = ({ value, options, onChange, missionId }) => {
  // 미션의 언어 목록을 드롭다운 형식으로 변환
  const dropdownOptions = options.map((lang) => ({
    label: lang.displayName,
    value: lang.language.toLowerCase() === lang.language ? lang.language : lang.language.toLowerCase(), // reverse map logic match
    // displayName은 이미 친절하게 나오므로 추가 작업 불필요
  }));

  // 현재 선택된 언어의 표시 이름 찾기
  const selectedOption = options.find(
    (opt) =>
      opt.language.toLowerCase() === value ||
      (opt.language === 'JAVASCRIPT' && value === 'javascript') ||
      (opt.language === 'PYTHON' && value === 'python') ||
      (opt.language === 'JAVA' && value === 'java') ||
      (opt.language === 'C' && value === 'c')
  );

  const trigger = (
    <button type="button" className="lang-select-trigger">
      <span className="lang-select-value">{selectedOption ? selectedOption.displayName : value}</span>
      <svg
        className="lang-select-arrow"
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
    <div className="language-select">
      <Dropdown
        trigger={trigger}
        options={dropdownOptions.map(opt => ({
          ...opt,
          // LanguageSelect에서는 점(Indicator)을 사용하지 않기로 함 (사용자 의견 반영)
        }))}
        value={value}
        onChange={onChange}
        ariaLabel="언어 선택"
        panelClassName="common-dropdown__panel--compact"
      />
    </div>
  );
};

LanguageSelect.propTypes = {
  value: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      language: PropTypes.string.isRequired,
      displayName: PropTypes.string.isRequired,
    })
  ).isRequired,
  onChange: PropTypes.func.isRequired,
  missionId: PropTypes.string,
};

export default LanguageSelect;
