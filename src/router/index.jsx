import React, { lazy, Suspense } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import AuthGuard from '../components/common/AuthGuard';
import PageLoader from '../components/common/PageLoader';

// Lazy 로딩 페이지들 (메인)
const HomePage = lazy(() => import('../pages/HomePage'));
const LoginPage = lazy(() => import('../pages/LoginPage'));
const SignupPage = lazy(() => import('../pages/SignupPage'));
const ResetPasswordPage = lazy(() => import('../pages/ResetPasswordPage'));
const MissionPage = lazy(() => import('../pages/MissionPage'));

// Dev 페이지들
const DevSearchFilterPage = lazy(() => import('../pages/dev/DevSearchFilterPage'));
const DevDifficultyFilterPage = lazy(() => import('../pages/dev/DevDifficultyFilterPage'));
const DevStatusFilterPage = lazy(() => import('../pages/dev/DevStatusFilterPage'));
const DevHomePage = lazy(() => import('../pages/dev/DevHomePage'));
const DevTestPage = lazy(() => import('../pages/dev/DevTestPage'));
const DevProblemDescriptionPage = lazy(() => import('../pages/dev/DevProblemDescriptionPage'));
const DevSignupPage = lazy(() => import('../pages/dev/DevSignupPage'));
const DevMessageBoxPage = lazy(() => import('../pages/dev/DevMessageBoxPage'));
const DevGnbPage = lazy(() => import('../pages/dev/DevGnbPage'));
const DevInputPage = lazy(() => import('../pages/dev/DevInputPage'));
const DevProgressBannerPage = lazy(() => import('../pages/dev/DevProgressBannerPage'));
const DevFooterPage = lazy(() => import('../pages/dev/DevFooterPage'));
const DevProblemCardPage = lazy(() => import('../pages/dev/DevProblemCardPage'));
const DevProblemListPage = lazy(() => import('../pages/dev/DevProblemListPage'));
const DevExecutionResultPage = lazy(() => import('../pages/dev/DevExecutionResultPage'));
const DevPaginationPage = lazy(() => import('../pages/dev/DevPaginationPage'));

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
    path: '/dev/signup',
    element: <Suspense fallback={<PageLoader />}><DevSignupPage /></Suspense>,
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
]);

export default router;
