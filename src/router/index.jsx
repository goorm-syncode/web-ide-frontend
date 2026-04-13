import React, { Suspense } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import AuthGuard from '../components/common/AuthGuard';
import PageLoader from '../components/common/PageLoader';
import { 
  HomePage, LoginPage, SignupPage, ResetPasswordPage, MissionPage, PresentationPage,
  DevSearchFilterPage, DevDifficultyFilterPage, DevStatusFilterPage, DevHomePage,
  DevTestPage, DevProblemDescriptionPage, DevMessageBoxPage, DevInputPage,
  DevProgressBannerPage, DevFooterPage, DevProblemCardPage, DevProblemListPage,
  DevExecutionResultPage, DevPaginationPage, DevChatWidgetPage, DevGnbPage
} from './lazyPages';

const router = createBrowserRouter([
  /* Dev 페이지들 */
  {
    path: '/dev/search-filter',
    element: <Suspense fallback={<PageLoader />}><DevSearchFilterPage /></Suspense>,
  },
  {
    path: '/dev/difficulty-filter',
    element: <Suspense fallback={<PageLoader />}><DevDifficultyFilterPage /></Suspense>,
  },
  {
    path: '/dev/status-filter',
    element: <Suspense fallback={<PageLoader />}><DevStatusFilterPage /></Suspense>,
  },
  {
    path: '/dev/home',
    element: <Suspense fallback={<PageLoader />}><DevHomePage /></Suspense>,
  },
  {
    path: '/dev/problem-description',
    element: <Suspense fallback={<PageLoader />}><DevProblemDescriptionPage /></Suspense>,
  },
  {
    path: '/dev/test',
    element: <Suspense fallback={<PageLoader />}><DevTestPage /></Suspense>,
  },

  {
    path: '/dev/message-box',
    element: <Suspense fallback={<PageLoader />}><DevMessageBoxPage /></Suspense>,
  },
  {
    path: '/dev/gnb',
    element: <Suspense fallback={<PageLoader />}><DevGnbPage /></Suspense>,
  },

  {
    path: '/dev/Input',
    element: <Suspense fallback={<PageLoader />}><DevInputPage /></Suspense>,
  },
  {
    path: '/dev/progress-banner',
    element: <Suspense fallback={<PageLoader />}><DevProgressBannerPage /></Suspense>,
  },
  {
    path: '/dev/footer',
    element: <Suspense fallback={<PageLoader />}><DevFooterPage /></Suspense>,
  },
  {
    path: '/dev/problem-card',
    element: <Suspense fallback={<PageLoader />}><DevProblemCardPage /></Suspense>,
  },
  {
    path: '/dev/problem-list',
    element: <Suspense fallback={<PageLoader />}><DevProblemListPage /></Suspense>,
  },
  {
    path: '/dev/execution-result',
    element: <Suspense fallback={<PageLoader />}><DevExecutionResultPage /></Suspense>,
  },
  {
    path: '/dev/pagination',
    element: <Suspense fallback={<PageLoader />}><DevPaginationPage /></Suspense>,
  },
  {
    path: '/dev/chat-widget',
    element: <Suspense fallback={<PageLoader />}><DevChatWidgetPage /></Suspense>,
  },

  /* 메인 서비스 페이지들 */
  {
    path: '/',
    element: <App />, /* App.jsx 내에서 Navigate가 처리할 예정 */
  },
  {
    path: '/home',
    element: (
      <AuthGuard>
        <Suspense fallback={<PageLoader />}>
          <HomePage />
        </Suspense>
      </AuthGuard>
    ),
  },
  {
    path: '/login',
    element: <Suspense fallback={<PageLoader />}><LoginPage /></Suspense>,
  },
  {
    path: '/signup',
    element: <Suspense fallback={<PageLoader />}><SignupPage /></Suspense>,
  },
  {
    path: '/forgot-password',
    element: <Suspense fallback={<PageLoader />}><ResetPasswordPage /></Suspense>,
  },
  {
    path: '/reset-password',
    element: <Suspense fallback={<PageLoader />}><ResetPasswordPage /></Suspense>,
  },
  {
    path: '/missions/:missionId',
    element: (
      <AuthGuard>
        <Suspense fallback={<PageLoader />}>
          <MissionPage />
        </Suspense>
      </AuthGuard>
    ),
  },
  {
    path: '/presentation/final',
    element: <Suspense fallback={<PageLoader />}><PresentationPage /></Suspense>,
  },
]);

export default router;
