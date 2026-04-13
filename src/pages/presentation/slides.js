// src/pages/presentation/slides.js
import { Slide01Cover, Slide01StartingPoint, Slide02Pivot, Slide03Overview, Slide04Team, Slide05TechStack, Slide06Tradeoff } from './slides/Part1';
import { Slide07Architecture, Slide08BackendArch, Slide09CoreHome, Slide10CoreIDE, Slide11CoreBackend, Slide12CoreChat } from './slides/Part2';
import { Slide13Productivity, Slide14CICD, Slide15Troubleshooting, Slide16Retrospective, Slide17Future, Slide18Conclusion } from './slides/Part3';

const slides = [
  { component: Slide01Cover, title: "표지: Learn Code" },
  { component: Slide01StartingPoint, title: "출발점: 도전과 핵심 가치" },
  { component: Slide02Pivot, title: "피벗: 학습 플랫폼으로의 진화" },
  { component: Slide03Overview, title: "사용자 여정 개요 (Learning Loop)" },
  { component: Slide04Team, title: "팀 운영 및 타임라인" },
  { component: Slide05TechStack, title: "기술 스택 (Tech Stack)" },
  { component: Slide06Tradeoff, title: "기술 선택과 트레이드오프" },
  { component: Slide07Architecture, title: "전체 시스템 아키텍처" },
  { component: Slide14CICD, title: "배포와 자동화 (CI/CD)" },
  { component: Slide08BackendArch, title: "백엔드 아키텍처" },
  { component: Slide09CoreHome, title: "학습 경험 허브 (홈/탐색)" },
  { component: Slide10CoreIDE, title: "Web IDE 환경" },
  { component: Slide11CoreBackend, title: "실행/채점 시스템 흐름" },
  { component: Slide12CoreChat, title: "SSE 기반 실시간 채팅" },
  { component: Slide15Troubleshooting, title: "트러블슈팅" },
  { component: Slide13Productivity, title: "협업 및 생산성 지표" },
  { component: Slide16Retrospective, title: "회고 (Retrospective)" },
  { component: Slide17Future, title: "향후 확장 계획 (Roadmap)" },
  { component: Slide18Conclusion, title: "마무리 (Q&A)" }
];

export default slides;
