import React from 'react';
import PropTypes from 'prop-types';
import '../../styles/components/layout/AuthLayout.css';
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

AuthLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthLayout;
