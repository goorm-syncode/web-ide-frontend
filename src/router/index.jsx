import React, { Suspense } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import AuthGuard from '../components/common/AuthGuard';
import PageLoader from '../components/common/PageLoader';
import * as Pages from './lazyPages';

const router = createBrowserRouter([
  /* Dev 페이지들 */
  {
    path: '/dev/search-filter',
    element: <Suspense fallback={<PageLoader />}><Pages.DevSearchFilterPage /></Suspense>,
  },
  {
    path: '/dev/difficulty-filter',
    element: <Suspense fallback={<PageLoader />}><Pages.DevDifficultyFilterPage /></Suspense>,
  },
  {
    path: '/dev/status-filter',
    element: <Suspense fallback={<PageLoader />}><Pages.DevStatusFilterPage /></Suspense>,
  },
  {
    path: '/dev/home',
    element: <Suspense fallback={<PageLoader />}><Pages.DevHomePage /></Suspense>,
  },
  {
    path: '/dev/problem-description',
    element: <Suspense fallback={<PageLoader />}><Pages.DevProblemDescriptionPage /></Suspense>,
  },
  {
    path: '/dev/test',
    element: <Suspense fallback={<PageLoader />}><Pages.DevTestPage /></Suspense>,
  },
  {
    path: '/dev/signup',
    element: <Suspense fallback={<PageLoader />}><Pages.DevSignupPage /></Suspense>,
  },
  {
    path: '/dev/message-box',
    element: <Suspense fallback={<PageLoader />}><Pages.DevMessageBoxPage /></Suspense>,
  },
  {
    path: '/dev/gnb',
    element: <Suspense fallback={<PageLoader />}><Pages.DevGnbPage /></Suspense>,
  },
  {
    path: '/dev/mypage',
    element: <Suspense fallback={<PageLoader />}><Pages.MyPageModalPage /></Suspense>,
  },
  {
    path: '/dev/Input',
    element: <Suspense fallback={<PageLoader />}><Pages.DevInputPage /></Suspense>,
  },
  {
    path: '/dev/progress-banner',
    element: <Suspense fallback={<PageLoader />}><Pages.DevProgressBannerPage /></Suspense>,
  },
  {
    path: '/dev/footer',
    element: <Suspense fallback={<PageLoader />}><Pages.DevFooterPage /></Suspense>,
  },
  {
    path: '/dev/problem-card',
    element: <Suspense fallback={<PageLoader />}><Pages.DevProblemCardPage /></Suspense>,
  },
  {
    path: '/dev/problem-list',
    element: <Suspense fallback={<PageLoader />}><Pages.DevProblemListPage /></Suspense>,
  },
  {
    path: '/dev/execution-result',
    element: <Suspense fallback={<PageLoader />}><Pages.DevExecutionResultPage /></Suspense>,
  },
  {
    path: '/dev/pagination',
    element: <Suspense fallback={<PageLoader />}><Pages.DevPaginationPage /></Suspense>,
  },
  {
    path: '/dev/chat-widget',
    element: <Suspense fallback={<PageLoader />}><Pages.DevChatWidgetPage /></Suspense>,
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
          <Pages.HomePage />
        </Suspense>
      </AuthGuard>
    ),
  },
  {
    path: '/login',
    element: <Suspense fallback={<PageLoader />}><Pages.LoginPage /></Suspense>,
  },
  {
    path: '/signup',
    element: <Suspense fallback={<PageLoader />}><Pages.SignupPage /></Suspense>,
  },
  {
    path: '/reset-password',
    element: <Suspense fallback={<PageLoader />}><Pages.ResetPasswordPage /></Suspense>,
  },
  {
    path: '/missions/:missionId',
    element: (
      <AuthGuard>
        <Suspense fallback={<PageLoader />}>
          <Pages.MissionPage />
        </Suspense>
      </AuthGuard>
    ),
  },
]);

export default router;
