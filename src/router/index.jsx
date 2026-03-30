import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import GNBTestPage from '../pages/dev/GNBTestPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/dev/gnb',
    element: <GNBTestPage />,
  },
]);

export default router;
