import DevDifficultyFilterPage from '../pages/dev/DevDifficultyFilterPage';
import DevStatusFilterPage from '../pages/dev/DevStatusFilterPage';
import DevHomePage from '../pages/dev/DevHomePage';
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

const router = createBrowserRouter([
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
    path: '/',
    element: <App />,
  },
  {
    path: '/dev/login',
    element: <DevLoginPage />,
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
