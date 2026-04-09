import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import '../../styles/components/layout/Gnb.css';
import MyPageModal from './MyPageModal';
import { logout } from '../../store/slices/authSlice';
import authService from '../../services/auth';

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

const UserIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
    <circle cx="12" cy="7" r="4"></circle>
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
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const [isMyPageOpen, setIsMyPageOpen] = React.useState(false);

  const handleLogout = async () => {
    try {
      const refreshToken = localStorage.getItem('refreshToken');
      if (refreshToken) {
        await authService.logout(refreshToken);
      }
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      dispatch(logout());
      navigate('/login');
    }
  };

  const handleLogin = () => {
    navigate('/login');
  };

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
        {isAuthenticated ? (
          <>
            <div 
              className="gnb-user-profile" 
              onClick={() => setIsMyPageOpen(true)}
              aria-label="마이페이지 열기"
            >
              <UserIcon />
              <span className="gnb-username">{user?.nickname || '사용자'}</span>
            </div>
            <button
              className="gnb-action-button gnb-auth-button"
              onClick={handleLogout}
              aria-label="로그아웃"
            >
              <span>Logout</span>
              <LogoutIcon />
            </button>
          </>
        ) : (
          <button
            className="gnb-action-button gnb-auth-button"
            onClick={handleLogin}
            aria-label="로그인"
          >
            Login
          </button>
        )}
      </div>

      <MyPageModal 
        isOpen={isMyPageOpen} 
        onClose={() => setIsMyPageOpen(false)} 
      />
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
