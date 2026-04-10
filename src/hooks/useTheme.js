import { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';

/**
 * 전역 테마(Dark/Light)를 관리하는 커스텀 훅입니다.
 * ThemeContext를 구독하여 모든 컴포넌트에서 동일한 상태를 공유합니다.
 */
export const useTheme = () => {
  const context = useContext(ThemeContext);
  
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }

  return context;
};
