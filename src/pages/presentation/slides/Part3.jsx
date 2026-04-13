/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { SlideLayout, SlideCard, MetricCard, Badge, InfoNode } from '../components/SlideBase';
import { FaGithub, FaChartLine, FaExclamationTriangle, FaCheckCircle, FaLaptopCode, FaCommentDots, FaClock, FaCode, FaRocket, FaCheck, FaSync, FaCloud, FaRobot, FaGamepad, FaDesktop } from 'react-icons/fa';

const Counter = ({ target, duration = 1500, isActive }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isActive) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setCount(0);
      return;
    }

    let start = 0;
    const end = parseInt(target);
    const increment = end / (duration / 16); 

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [target, duration, isActive]);

  return <>{count}</>;
};

export const Slide13Productivity = ({ isActive }) => {
  return (
    <SlideLayout title="협업과 개발 생산성" subtitle="숫자로 증명하는 팀의 몰입도와 자동화 성과">
       <div style={{ display: 'flex', gap: '4rem', marginTop: '4rem' }}>
          <MetricCard value={<Counter target="74" isActive={isActive} />} label="Frontend PRs" style={{ flex: 1, padding: '5rem 2rem' }} />
          <MetricCard value={<Counter target="229" isActive={isActive} />} label="Frontend Commits" style={{ flex: 1, padding: '5rem 2rem', borderTop: '1rem solid var(--slide-primary)' }} />
          <MetricCard value={<Counter target="67" isActive={isActive} />} label="Backend Commits" style={{ flex: 1, padding: '5rem 2rem' }} />
       </div>

       <div style={{ marginTop: '5rem', display: 'flex', justifyContent: 'center', gap: '4rem' }}>
          <Badge style={{ padding: '1.5rem 3rem', fontSize: '2rem' }}><FaCheckCircle style={{ marginRight: '1rem' }} /> PR Lint & Build Checks</Badge>
          <Badge variant="accent" style={{ padding: '1.5rem 3rem', fontSize: '2rem' }}><FaLaptopCode style={{ marginRight: '1rem' }} /> Dev Routes Component Testing</Badge>
       </div>
    </SlideLayout>
  );
};

export const Slide14CICD = () => {
  return (
    <SlideLayout title="CI/CD와 배포 파이프라인" subtitle="자동화된 검증과 전세계로 서빙되는 고가용성 인프라">
       <div style={{ display: 'flex', gap: '4rem', height: '100%', marginTop: '3rem' }}>
          <div style={{ flex: 1 }}>
             <SlideCard title="Frontend Delivery" icon={<FaRocket color="#61DAFB" />} style={{ height: '100%', borderTop: '1rem solid #61DAFB' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', marginTop: '2rem' }}>
                   {[
                     { l: 'GitHub Action Trigger', i: <FaGithub /> },
                     { l: 'Vite Production Build', i: <FaCode /> },
                     { l: 'AWS S3 Sync', i: <FaCloud /> },
                     { l: 'CloudFront Invalidation', i: <FaSync /> }
                   ].map((s, idx) => (
                     <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '2rem', fontSize: '2rem' }}>
                        <div style={{ fontSize: '3rem', color: '#61DAFB' }}>{s.i}</div>
                        <div>{s.l}</div>
                     </div>
                   ))}
                </div>
             </SlideCard>
          </div>
          
          <div style={{ flex: 1 }}>
             <SlideCard title="Backend Delivery" icon={<FaRocket color="#6DB33F" />} style={{ height: '100%', borderTop: '1rem solid #6DB33F' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', marginTop: '2rem' }}>
                   {[
                     { l: 'GitHub Action Trigger', i: <FaGithub /> },
                     { l: 'Gradle Test & Build', i: <FaCheck /> },
                     { l: 'AWS ECR Image Push', i: <FaRocket /> },
                     { l: 'EC2 Docker Deployment', i: <FaCode /> }
                   ].map((s, idx) => (
                     <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '2rem', fontSize: '2rem' }}>
                        <div style={{ fontSize: '3rem', color: '#6DB33F' }}>{s.i}</div>
                        <div>{s.l}</div>
                     </div>
                   ))}
                </div>
             </SlideCard>
          </div>
       </div>
    </SlideLayout>
  );
};


export const Slide15Troubleshooting = () => {
  return (
    <SlideLayout title="트러블슈팅 (Troubleshooting)" subtitle="직면한 기술적 한계를 극복하며 배운 점">
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', marginTop: '1rem' }}>
        <div style={{ display: 'flex', gap: '2.5rem' }}>
           <SlideCard title="JWT Token Rotation" icon={<FaExclamationTriangle color="var(--slide-accent)" />} style={{ flex: 1, borderLeft: '1rem solid var(--slide-accent)', padding: '2rem' }}>
              <div style={{ fontSize: '1.8rem', fontWeight: 900, color: 'var(--slide-accent)', marginBottom: '1rem' }}>Challenge: UX Continuity</div>
              <p style={{ fontSize: '1.5rem', color: 'var(--slide-muted)' }}>액세스 토큰 만료 시 로그인 튕김 현상을 Axios Interceptor와 Refresh Token Rotation으로 해결하여 끊김 없는 학습 환경 구축.</p>
           </SlideCard>
           
           <SlideCard title="SSE Authenticated Stream" icon={<FaCommentDots color="var(--slide-accent)" />} style={{ flex: 1, borderLeft: '1rem solid var(--slide-accent)', padding: '2rem' }}>
              <div style={{ fontSize: '1.7rem', fontWeight: 900, color: 'var(--slide-accent)', marginBottom: '1rem' }}>Challenge: Header Authentication</div>
              <p style={{ fontSize: '1.4rem', color: 'var(--slide-muted)' }}>브라우저의 EventSource는 커스텀 헤더를 지원하지 않고, Axios는 스트림 응답 처리에 한계가 있었습니다. 이를 해결하고자 fetch API와 ReadableStream을 이용해 Bearer 토큰 인증과 실시간 데이터 수신을 모두 충족하는 라이브 통신 모듈을 직접 구현했습니다.</p>
           </SlideCard>
        </div>
        
        <SlideCard title="Web IDE Responsive Layout" icon={<FaDesktop color="var(--slide-accent)" />} style={{ borderLeft: '1rem solid var(--slide-accent)', padding: '2.5rem' }}>
            <div style={{ fontSize: '1.8rem', fontWeight: 900, color: 'var(--slide-accent)', marginBottom: '1rem' }}>Challenge: Screen Space Management</div>
            <p style={{ fontSize: '1.5rem', color: 'var(--slide-muted)' }}>브라우저 내 복잡한 IDE 레이아웃(사이드바/에디터/터미널)을 모바일 및 다양한 해상도에서 유지하기 위해 Flex/Grid 하이브리드 설계 및 동적 리사이징 로직 구현.</p>
        </SlideCard>
      </div>
    </SlideLayout>
  );
};

export const Slide16Retrospective = () => {
  return (
    <SlideLayout title="성과 및 회고" subtitle="협업의 경험과 기술적 성장을 복기하며">
      <div style={{ display: 'flex', gap: '2rem', marginTop: '1rem', alignItems: 'stretch' }}>
         <div style={{ flex: 1, background: '#fff', borderRadius: '40px', padding: '3.5rem', boxShadow: 'var(--slide-shadow-lg)', border: '1px solid var(--slide-border)' }}>
            <h3 style={{ fontSize: '2.2rem', fontWeight: 900, color: '#2e7d32', marginBottom: '1.5rem', borderBottom: '3px solid #eee', paddingBottom: '1rem' }}>Core Achievements</h3>
            <ul style={{ fontSize: '1.45rem', lineHeight: '2', paddingLeft: '2rem', color: 'var(--slide-text)', wordBreak: 'keep-all', textAlign: 'left' }}>
              <li style={{ marginBottom: '0.8rem' }}><strong>Integrated Development</strong><br/>프론트엔드부터 인프라까지 전 과정의 통합 개발</li>
              <li style={{ marginBottom: '0.8rem' }}><strong>DevOps Practical</strong><br/>CI/CD 자동화를 통한 릴리즈 안정성 및 작업 효율 확보</li>
              <li style={{ marginBottom: '0.8rem' }}><strong>Collaboration Tools</strong><br/>GitHub, Trello 등 협업 툴의 실무적 활용 경험</li>
              <li><strong>Real-time UX</strong><br/>SSE 스트리밍을 통한 실시간 상호작용 가시화</li>
            </ul>
         </div>

         <div style={{ flex: 1, background: 'rgba(244, 81, 30, 0.03)', borderRadius: '40px', padding: '3.5rem', border: '2px dashed var(--slide-accent)' }}>
            <h3 style={{ fontSize: '2.2rem', fontWeight: 900, color: 'var(--slide-accent)', marginBottom: '1.5rem', paddingBottom: '1rem' }}>Lessons & Improvements</h3>
            <ul style={{ fontSize: '1.45rem', lineHeight: '2', paddingLeft: '2rem', color: 'var(--slide-text)', wordBreak: 'keep-all', textAlign: 'left' }}>
              <li style={{ marginBottom: '0.8rem' }}><strong>기획/설계 정교화</strong><br/>사용자 흐름을 반영한 면밀한 기획 및 아키텍처 설계의 중요성</li>
              <li style={{ marginBottom: '0.8rem' }}><strong>협업 프로세스</strong><br/>팀 내 컨벤션 정립 및 기술 문서화의 필요성</li>
              <li style={{ marginBottom: '0.8rem' }}><strong>최적화 과제</strong><br/>복잡한 동적 레이아웃에서의 렌더링 성능 최적화 미흡</li>
              <li><strong>테스트 코드</strong><br/>일정 내 유닛 테스트 커버리지 확보의 아쉬움</li>
            </ul>
         </div>
      </div>
    </SlideLayout>
  );
};

export const Slide17Future = () => {
  return (
    <SlideLayout title="향후 확장 로드맵" subtitle="플랫폼의 성장을 위한 다음 단계">
      <div style={{ display: 'flex', justifyContent: 'center', height: '100%', alignItems: 'center', gap: '4rem' }}>
         {[
           { icon: <FaClock />, label: "비동기 채점 고도화", desc: "MQ 도입 & 대규모 처리", color: 'var(--slide-primary)' },
           { icon: <FaRobot />, label: "AI 튜터 시스템", desc: "실시간 코드 분석 및 가이드", color: 'var(--slide-secondary)' },
           { icon: <FaGamepad />, label: "게이미피케이션", desc: "레벨/경험치/뱃지 기반 동기 부여", color: 'var(--slide-accent)' },
           { icon: <FaChartLine />, label: "데이터 분석", desc: "개인화된 학습 추천", color: '#6f42c1' }
         ].map((r, idx) => (
           <InfoNode key={idx} icon={r.icon} label={r.label} desc={r.desc} color={r.color} style={{ width: '300px', padding: '4rem 2rem' }} />
         ))}
      </div>
    </SlideLayout>
  );
};

export const Slide18Conclusion = () => {
  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', background: 'linear-gradient(135deg, var(--slide-bg) 0%, rgba(0, 68, 148, 0.05) 100%)' }}>
      <h1 style={{ fontSize: '8rem', fontWeight: 900, color: 'var(--slide-primary)', letterSpacing: '-0.05em', marginBottom: '2rem' }}>
        Thank You
      </h1>
      <p style={{ fontSize: '3rem', color: 'var(--slide-muted)', fontWeight: 500, marginBottom: '6rem' }}>
        질문과 피드백을 환영합니다.
      </p>
      
      <div style={{ padding: '3rem 6rem', background: '#fff', borderRadius: '40px', boxShadow: 'var(--slide-shadow-lg)', border: '2px solid var(--slide-primary)' }}>
        <h2 style={{ fontSize: '4.5rem', color: 'var(--slide-primary)', margin: 0, fontWeight: 900 }}>Q & A</h2>
      </div>

      <div style={{ position: 'absolute', bottom: '10%', display: 'flex', alignItems: 'center', gap: '1rem', fontSize: '1.8rem', fontWeight: 700, color: 'var(--slide-muted)' }}>
        <div style={{ width: '12px', height: '12px', background: 'var(--slide-accent)', borderRadius: '50%' }}></div>
        Sync Code | Final Presentation
      </div>
    </div>
  );
};
