import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import '../../styles/components/common/Input.css';
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
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="input-icon"
              aria-hidden="true"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          )}
          <input
            id={id}
            ref={ref}
            type={type}
            className={`input-field ${error ? 'input-error' : ''} ${icon ? 'input-with-icon' : ''} ${error ? 'input-with-error-icon' : ''}`.trim()}
            disabled={disabled}
            {...props}
          />
          {error && (
            <div className="input-error-icon">!</div>
          )}
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
