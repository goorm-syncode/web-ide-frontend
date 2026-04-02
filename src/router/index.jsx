import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import DevSignupPage from '../pages/dev/DevSignupPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/dev/signup',
    element: <DevSignupPage />,
  }
]);

export default router;
