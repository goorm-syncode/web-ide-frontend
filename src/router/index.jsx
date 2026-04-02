import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import DevSignupPage from '../pages/dev/DevSignupPage';
import DevMessageBoxPage from '../pages/dev/DevMessageBoxPage';
import DevGnbPage from '../pages/dev/DevGnbPage';
import DevInputPage from '../pages/dev/DevInputPage';

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
    path: '/dev/input',
    element: <DevInputPage />,
  },
  {
    path: '/dev/Input',
    element: <DevInputPage />,
  },
]);

export default router;
