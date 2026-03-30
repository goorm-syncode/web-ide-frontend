import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import DevMessageBoxPage from '../pages/dev/DevMessageBoxPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/dev/message-box',
    element: <DevMessageBoxPage />,
  }
]);

export default router;
