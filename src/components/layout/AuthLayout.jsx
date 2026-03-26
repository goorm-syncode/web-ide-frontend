import React from 'react';
import '../../styles/AuthLayout.css';

const AuthLayout = ({ children, title }) => {
  return (
    <div className="auth-layout-container">
      <div className="auth-card">
        {title && <h1 className="auth-card-title">{title}</h1>}
        <div className="auth-card-content">
          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
