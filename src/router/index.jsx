import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import DevMessageBoxPage from '../pages/dev/DevMessageBoxPage';
import DevGnbPage from '../pages/dev/DevGnbPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/dev/message-box',
    element: <DevMessageBoxPage />,
  },
  {
    path: '/dev/gnb',
    element: <DevGnbPage />,
  }
]);

export default router;
