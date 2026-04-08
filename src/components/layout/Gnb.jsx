import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import '../../styles/components/layout/Gnb.css';

const BackArrowIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M15 18l-6-6 6-6" />
  </svg>
);

const LogoutIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
    <polyline points="16 17 21 12 16 7"></polyline>
    <line x1="21" y1="12" x2="9" y2="12"></line>
  </svg>
);

const Gnb = ({
  title = 'Coding Test',
  showBackButton = false,
  onBackClick,
  isLoggedIn = true,
  userName = '닉네임',
  onLogoutClick,
  onLoginClick,
}) => {
  const navigate = useNavigate();

  return (
    <header className="gnb-container">
      <div className="gnb-left">
        {showBackButton && (
          <button className="gnb-back-button" onClick={onBackClick} aria-label="뒤로 가기">
            <BackArrowIcon />
          </button>
        )}
        <h1 className="gnb-title" onClick={() => navigate('/home')}>
          {title}
        </h1>
      </div>

      <div className="gnb-right">
        {isLoggedIn ? (
          <>
            <span className="gnb-username">{userName}</span>
            <button
              className="gnb-action-button gnb-auth-button"
              onClick={onLogoutClick}
              aria-label="로그아웃"
            >
              <span>Logout</span>
              <LogoutIcon />
            </button>
          </>
        ) : (
          <button
            className="gnb-action-button gnb-auth-button"
            onClick={onLoginClick}
            aria-label="로그인"
          >
            Login
          </button>
        )}
      </div>
    </header>
  );
};

Gnb.propTypes = {
  title: PropTypes.string,
  showBackButton: PropTypes.bool,
  onBackClick: PropTypes.func,
  isLoggedIn: PropTypes.bool,
  userName: PropTypes.string,
  onLogoutClick: PropTypes.func,
  onLoginClick: PropTypes.func,
};

export default Gnb;
