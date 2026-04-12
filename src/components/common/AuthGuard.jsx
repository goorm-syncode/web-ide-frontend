import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { fetchMe } from '../../store/slices/authSlice';
import MessageBox from './MessageBox';

/**
 * AuthGuard component to protect routes that require authentication.
 * If the user is not authenticated, it redirects to the login page.
 * 
 * 세션 만료(auth:session-expired) 이벤트를 수신하여 MessageBox로 사용자에게 알리고
 * 확인 클릭 시 /login으로 이동합니다.
 * 
 * @param {Object} props
 * @param {React.ReactNode} props.children - The children to render if authenticated.
 * @returns {React.ReactNode} - The children or a Navigate component.
 */
const AuthGuard = ({ children }) => {
  const { isAuthenticated, user, loading } = useSelector((state) => state.auth);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [sessionExpiredOpen, setSessionExpiredOpen] = useState(false);

  // auth:session-expired 이벤트 수신 → MessageBox 표시
  React.useEffect(() => {
    const handleSessionExpired = () => {
      setSessionExpiredOpen(true);
    };

    window.addEventListener('auth:session-expired', handleSessionExpired);
    return () => window.removeEventListener('auth:session-expired', handleSessionExpired);
  }, []);

  // 세션 만료 MessageBox 확인 클릭 시 /login으로 이동
  const handleSessionExpiredConfirm = () => {
    setSessionExpiredOpen(false);
    navigate('/login', { replace: true });
  };

  React.useEffect(() => {
    // 인증은 되었는데 사용자 정보가 없는 경우 정보를 가져옵니다.
    if (isAuthenticated && !user && !loading) {
      dispatch(fetchMe());
    }
  }, [isAuthenticated, user, loading, dispatch]);

  // Loading state can be handled here if needed (e.g., showing a spinner while checking token)
  if (loading) {
    return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>Loading...</div>;
  }

  if (!isAuthenticated) {
    // Redirect to login page, but save the current location to redirect back after login
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return (
    <>
      {children}
      <MessageBox
        isOpen={sessionExpiredOpen}
        onClose={handleSessionExpiredConfirm}
        onConfirm={handleSessionExpiredConfirm}
        type="warning"
        title="로그인 만료"
        confirmText="로그인하기"
      >
        로그인이 만료되었습니다.\n다시 로그인해주세요.
      </MessageBox>
    </>
  );
};

AuthGuard.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthGuard;
