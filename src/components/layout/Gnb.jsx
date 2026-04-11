import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../hooks/useTheme';
import logo from '../../assets/learncode-icon.png';
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

const SettingsIcon = () => (
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
    <circle cx="12" cy="12" r="3"></circle>
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
  </svg>
);

const SunIcon = () => (
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
    <circle cx="12" cy="12" r="5"></circle>
    <line x1="12" y1="1" x2="12" y2="3"></line>
    <line x1="12" y1="21" x2="12" y2="23"></line>
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
    <line x1="1" y1="12" x2="3" y2="12"></line>
    <line x1="21" y1="12" x2="23" y2="12"></line>
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
  </svg>
);

const MoonIcon = () => (
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
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
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
  onSettingsClick,
  fluid = false,
}) => {
  const navigate = useNavigate();
  const { isDark, toggleTheme } = useTheme();

  return (
    <header className="gnb-container">
      <div className={`gnb-inner ${fluid ? 'fluid' : ''}`}>
        <div className="gnb-left">
          {showBackButton && (
            <button className="gnb-back-button" onClick={onBackClick} aria-label="뒤로 가기">
              <BackArrowIcon />
            </button>
          )}
          <h1 className="gnb-title" onClick={() => navigate('/home')}>
            <img src={logo} alt="LearnCode Logo" className="gnb-logo" />
            {title}
          </h1>
        </div>

        <div className="gnb-right">
          {isLoggedIn ? (
            <>
              <div className="gnb-user-group">
                <button
                  className="gnb-theme-toggle"
                  onClick={toggleTheme}
                  aria-label={isDark ? '라이트 모드로 전환' : '다크 모드로 전환'}
                >
                  {isDark ? <SunIcon /> : <MoonIcon />}
                </button>
                <span className="gnb-username">{userName}</span>
                <button
                  className="gnb-settings-button"
                  onClick={onSettingsClick}
                  aria-label="마이페이지 설정"
                >
                  <SettingsIcon />
                </button>
              </div>
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
  onSettingsClick: PropTypes.func,
  fluid: PropTypes.bool,
};

export default Gnb;
