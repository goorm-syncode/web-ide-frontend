import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import DevSignupPage from '../pages/dev/DevSignupPage';
import DevMessageBoxPage from '../pages/dev/DevMessageBoxPage';
import DevGnbPage from '../pages/dev/DevGnbPage';
import DevProgressBannerPage from '../pages/dev/DevProgressBannerPage';
import DevFooterPage from '../pages/dev/DevFooterPage';
import DevProblemCardPage from '../pages/dev/DevProblemCardPage';
import DevLoginPage from '../pages/dev/LoginPage';
import DevProblemListPage from '../pages/dev/DevProblemListPage';

const router = createBrowserRouter([
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
    path: '/dev/progress-banner',
    element: <DevProgressBannerPage />,
  },
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
  }
]);

export default router;
