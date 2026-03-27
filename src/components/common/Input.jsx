import React, { forwardRef } from 'react';
import '../../styles/components/Input.css';

const Input = forwardRef(
  (
    { id, type = 'text', error = false, helperText, className = '', disabled = false, ...props },
    ref,
  ) => {
    return (
      <div className={`input-wrapper ${className}`.trim()}>
        <input
          id={id}
          ref={ref}
          type={type}
          className={`input-field ${error ? 'input-error' : ''}`}
          disabled={disabled}
          {...props}
        />
        {helperText && (
          <span className={`input-helper ${error ? 'input-helper-error' : ''}`}>{helperText}</span>
        )}
      </div>
    );
  },
);

Input.displayName = 'Input';

export default Input;
