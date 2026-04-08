import DevSearchFilterPage from '../pages/dev/DevSearchFilterPage';
import DevDifficultyFilterPage from '../pages/dev/DevDifficultyFilterPage';
import DevStatusFilterPage from '../pages/dev/DevStatusFilterPage';
import DevHomePage from '../pages/dev/DevHomePage';
import DevTestPage from '../pages/dev/DevTestPage';
import HomePage from '../pages/HomePage';
import DevProblemDescriptionPage from '../pages/dev/DevProblemDescriptionPage';
import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import DevSignupPage from '../pages/dev/DevSignupPage';
import DevMessageBoxPage from '../pages/dev/DevMessageBoxPage';
import DevGnbPage from '../pages/dev/DevGnbPage';
import DevInputPage from '../pages/dev/DevInputPage';
import DevProgressBannerPage from '../pages/dev/DevProgressBannerPage';
import DevFooterPage from '../pages/dev/DevFooterPage';
import DevProblemCardPage from '../pages/dev/DevProblemCardPage';
import DevLoginPage from '../pages/dev/LoginPage';
import DevProblemListPage from '../pages/dev/DevProblemListPage';
import DevExecutionResultPage from '../pages/dev/DevExecutionResultPage';
import DevPaginationPage from '../pages/dev/DevPaginationPage';
import LoginPage from '../pages/LoginPage';
import SignupPage from './signup';
import MissionPage from '../pages/MissionPage';
import ResetPasswordPage from '../pages/ResetPasswordPage';
import AuthGuard from '../components/common/AuthGuard';

const router = createBrowserRouter([
  {
    path: '/dev/search-filter',
    element: <DevSearchFilterPage />,
  },
  {
    path: '/dev/difficulty-filter',
    element: <DevDifficultyFilterPage />,
  },
  {
    path: '/dev/status-filter',
    element: <DevStatusFilterPage />,
  },
  {
    path: '/dev/home',
    element: <DevHomePage />,
  },
  {
    path: '/dev/problem-description',
    element: <DevProblemDescriptionPage />,
  },
  {
    path: '/dev/test',
    element: <DevTestPage />,
  },
  {
    path: '/',
    element: <App />, /* App.jsx 내에서 Navigate가 처리할 예정 */
  },
  {
    path: '/home',
    element: (
      <AuthGuard>
        <HomePage />
      </AuthGuard>
    ),
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/signup',
    element: <SignupPage />,
  },
  {
    path: '/reset-password',
    element: <ResetPasswordPage />,
  },
  {
    path: '/missions/:missionId',
    element: (
      <AuthGuard>
        <MissionPage />
      </AuthGuard>
    ),
  },
  {
    path: '/dev/signup',
    element: <DevSignupPage />,
  },
  {
    path: '/dev/message-box',
    element: <DevMessageBoxPage />,
  },
  {
    path: '/dev/gnb',
    element: <DevGnbPage />,
  },
  {
    path: '/dev/Input',
    element: <DevInputPage />,
  },
  {
    path: '/dev/progress-banner',
    element: <DevProgressBannerPage />,
  },
  {
    path: '/dev/footer',
    element: <DevFooterPage />,
  },
  {
    path: '/dev/problem-card',
    element: <DevProblemCardPage />,
  },
  {
    path: '/dev/problem-list',
    element: <DevProblemListPage />,
  },
  {
    path: '/dev/execution-result',
    element: <DevExecutionResultPage />,
  },
  {
    path: '/dev/pagination',
    element: <DevPaginationPage />,
  },
]);

export default router;
