import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';

/**
 * AuthGuard component to protect routes that require authentication.
 * If the user is not authenticated, it redirects to the login page.
 * 
 * @param {Object} props
 * @param {React.ReactNode} props.children - The children to render if authenticated.
 * @returns {React.ReactNode} - The children or a Navigate component.
 */
const AuthGuard = ({ children }) => {
  const { isAuthenticated, loading } = useSelector((state) => state.auth);
  const location = useLocation();

  // Loading state can be handled here if needed (e.g., showing a spinner while checking token)
  if (loading) {
    return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>Loading...</div>;
  }

  if (!isAuthenticated) {
    // Redirect to login page, but save the current location to redirect back after login
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default AuthGuard;
