import React from 'react';
import Input from '../common/Input';
import '../../styles/components/SearchFilter.css';

/**
 * SearchFilter 컴포넌트
 *
 * @param {Object} props
 * @param {string} props.value - 검색어 값
 * @param {function} props.onChange - 검색어 변경 핸들러
 * @param {string} [props.placeholder='Search problems...'] - 플레이스홀더 (기본값 설정)
 * @param {string} [props.className=''] - 추가 클래스명
 */
const SearchFilter = ({ value, onChange, placeholder = 'Search problems...', className = '', ...props }) => {
  const handleChange = (e) => {
    if (onChange) {
      onChange(e.target.value);
    }
  };

  return (
    <div className={`search-filter ${className}`.trim()}>
      <Input
        type="text"
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        icon="search"
        className="search-filter__input"
        {...props}
      />
    </div>
  );
};

export default SearchFilter;
