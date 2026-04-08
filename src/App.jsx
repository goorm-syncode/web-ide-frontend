import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import './styles/App.css';

/**
 * App 컴포넌트는 루트 경로(/) 접근 시 사용자의 인증 상태를 확인하여
 * /home 또는 /login으로 리다이렉트하는 역할을 수행합니다.
 */
function App() {
  const { isAuthenticated } = useSelector((state) => state.auth);

  if (isAuthenticated) {
    return <Navigate to="/home" replace />;
  }

  return <Navigate to="/login" replace />;
}

export default App;
