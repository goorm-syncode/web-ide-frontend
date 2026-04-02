import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import DevSignupPage from '../pages/dev/DevSignupPage';
import DevMessageBoxPage from '../pages/dev/DevMessageBoxPage';
import DevGnbPage from '../pages/dev/DevGnbPage';
import DevFooterPage from '../pages/dev/DevFooterPage';
import DevProblemCardPage from '../pages/dev/DevProblemCardPage';
import DevProblemListPage from '../pages/dev/DevProblemListPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
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
