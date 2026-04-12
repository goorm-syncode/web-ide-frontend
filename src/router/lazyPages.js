import { lazy } from 'react';

// 메인 서비스 페이지들
export const HomePage = lazy(() => import('../pages/HomePage'));
export const LoginPage = lazy(() => import('../pages/LoginPage'));
export const SignupPage = lazy(() => import('../pages/SignupPage'));
export const ResetPasswordPage = lazy(() => import('../pages/ResetPasswordPage'));
export const MissionPage = lazy(() => import('../pages/MissionPage'));

// Dev 페이지들
export const DevSearchFilterPage = lazy(() => import('../pages/dev/DevSearchFilterPage'));
export const DevDifficultyFilterPage = lazy(() => import('../pages/dev/DevDifficultyFilterPage'));
export const DevStatusFilterPage = lazy(() => import('../pages/dev/DevStatusFilterPage'));
export const DevHomePage = lazy(() => import('../pages/dev/DevHomePage'));
export const DevTestPage = lazy(() => import('../pages/dev/DevTestPage'));
export const DevProblemDescriptionPage = lazy(() => import('../pages/dev/DevProblemDescriptionPage'));

export const DevMessageBoxPage = lazy(() => import('../pages/dev/DevMessageBoxPage'));
export const DevInputPage = lazy(() => import('../pages/dev/DevInputPage'));
export const DevProgressBannerPage = lazy(() => import('../pages/dev/DevProgressBannerPage'));
export const DevFooterPage = lazy(() => import('../pages/dev/DevFooterPage'));
export const DevProblemCardPage = lazy(() => import('../pages/dev/DevProblemCardPage'));
export const DevProblemListPage = lazy(() => import('../pages/dev/DevProblemListPage'));
export const DevExecutionResultPage = lazy(() => import('../pages/dev/DevExecutionResultPage'));
export const DevPaginationPage = lazy(() => import('../pages/dev/DevPaginationPage'));
export const DevChatWidgetPage = lazy(() => import('../pages/dev/DevChatWidgetPage'));
export const DevGnbPage = lazy(() => import('../pages/dev/DevGnbPage'));
export const MyPageModalPage = lazy(() => import('../components/modals/MyPageModal'));
