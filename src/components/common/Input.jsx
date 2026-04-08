import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import '../../styles/components/common/Input.css';
import searchIconImg from '../../assets/search-icon.png';

const Input = forwardRef(
  (
    {
      id,
      type = 'text',
      error = false,
      helperText,
      className = '',
      disabled = false,
      icon,
      ...props
    },
    ref,
  ) => {
    return (
      <div className={`input-wrapper ${className}`.trim()}>
        <div className="input-inner-wrapper">
          {icon === 'search' && (
            <img src={searchIconImg} alt="search" width="20" height="20" className="input-icon" />
          )}
          <input
            id={id}
            ref={ref}
            type={type}
            className={`input-field ${error ? 'input-error' : ''} ${icon ? 'input-with-icon' : ''}`.trim()}
            disabled={disabled}
            {...props}
          />
        </div>

        {helperText && (
          <span className={`input-helper ${error ? 'input-helper-error' : ''}`}>{helperText}</span>
        )}
      </div>
    );
  },
);

Input.displayName = 'Input';

Input.propTypes = {
  id: PropTypes.string,
  type: PropTypes.string,
  error: PropTypes.bool,
  helperText: PropTypes.string,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  icon: PropTypes.oneOf(['search']),
};

export default Input;
