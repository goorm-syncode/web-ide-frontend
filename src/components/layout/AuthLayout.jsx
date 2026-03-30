import React from 'react';
import '../../styles/AuthLayout.css';
import Card from '../common/Card';

const AuthLayout = ({ children }) => {
  return (
    <div className="auth-layout-container">
      <div className="auth-layout-card-wrapper">
        <Card>
          {children}
        </Card>
      </div>
    </div>
  );
};

export default AuthLayout;
