/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { SlideLayout, SlideCard, MetricCard, Badge, InfoNode } from '../components/SlideBase';
import { FaGithub, FaChartLine, FaExclamationTriangle, FaCheckCircle, FaLaptopCode, FaCommentDots, FaClock, FaCode, FaRocket, FaCheck, FaSync, FaCloud, FaRobot, FaGamepad, FaDesktop, FaBox } from 'react-icons/fa';

const Counter = ({ target, duration = 1500, isActive }) => {
  const [count, setCount] = useState(0);
  const end = parseInt(target);

  useEffect(() => {
    if (!isActive) {
      setCount(0);
      return;
    }

    let start = 0;
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
  }, [end, duration, isActive]);

  return (
    <>
      {count}
      {isActive && count === end && <span style={{ marginLeft: '2px', fontSize: '0.8em' }}>+</span>}
    </>
  );
};

export const Slide13Productivity = ({ isActive }) => {
  return (
    <SlideLayout title="협업과 개발 생산성" subtitle="더 나은 협업과 성장을 위해 함께 고민하며 남겨온 지표와 방법들">
       <div style={{ display: 'flex', gap: '4rem', marginTop: '4rem' }}>
          <MetricCard value={<Counter target="74" isActive={isActive} />} label="Frontend PRs" style={{ flex: 1, padding: '5rem 2rem' }} />
          <MetricCard value={<Counter target="229" isActive={isActive} />} label="Frontend Commits" style={{ flex: 1, padding: '5rem 2rem', borderTop: '1rem solid var(--slide-primary)' }} />
          <MetricCard value={<Counter target="67" isActive={isActive} />} label="Backend Commits" style={{ flex: 1, padding: '5rem 2rem' }} />
       </div>

       {/* Bottom Highlight Cards */}
       {/* Bottom Highlight Cards */}
       <div style={{ display: 'flex', justifyContent: 'center', gap: '5rem', marginTop: '4rem', width: '100%', padding: '0 4rem' }}>
          <div style={{ 
            background: 'rgba(255, 255, 255, 0.9)', 
            padding: '2rem 2.5rem', 
            borderRadius: '24px', 
            boxShadow: '0 15px 35px rgba(0,0,0,0.06)',
            border: '1px solid #e0e0e0',
            display: 'flex',
            alignItems: 'center',
            gap: '1.8rem',
            flex: 1,
            maxWidth: '520px'
          }}>
            <div style={{ background: '#E8F5E9', padding: '1.2rem', borderRadius: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <FaCheckCircle size={36} color="#27ae60" />
            </div>
            <div>
              <div style={{ fontWeight: 800, fontSize: '1.45rem', color: '#1a1a1a', marginBottom: '0.4rem' }}>PR 단위 자동 빌드 테스트</div>
              <div style={{ fontSize: '1.05rem', color: '#555', lineHeight: '1.5', wordBreak: 'keep-all' }}>GitHub Actions를 활용한 린트 체크 및 빌드 오류 사전 검증</div>
            </div>
          </div>

          <div style={{ 
            background: 'rgba(255, 255, 255, 0.9)', 
            padding: '2rem 2.5rem', 
            borderRadius: '24px', 
            boxShadow: '0 15px 35px rgba(0,0,0,0.06)',
            border: '1px solid #e0e0e0',
            display: 'flex',
            alignItems: 'center',
            gap: '1.8rem',
            flex: 1,
            maxWidth: '520px'
          }}>
            <div style={{ background: '#E3F2FD', padding: '1.2rem', borderRadius: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <FaLaptopCode size={36} color="#2980b9" />
            </div>
            <div>
              <div style={{ fontWeight: 800, fontSize: '1.45rem', color: '#1a1a1a', marginBottom: '0.4rem' }}>컴포넌트 독립 테스트 라우트</div>
              <div style={{ fontSize: '1.05rem', color: '#555', lineHeight: '1.5', wordBreak: 'keep-all' }}>서버 미완성 상태에서도 자유로운 UI 가시화 및 기능 검증</div>
            </div>
          </div>
       </div>
    </SlideLayout>
  );
};

export const Slide14CICD = () => {
  return (
    <SlideLayout title="CI/CD와 배포 파이프라인" subtitle="반복적인 배포 과정 자동화를 통한 신속한 개발 주기와 서비스 안정성 확보">
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
                     { l: 'Docker Image Build', i: <FaBox /> },
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

export const Slide15Troubleshooting01 = () => {
  return (
    <SlideLayout title="트러블슈팅 #01: JWT 인증과 UX 연속성" subtitle="보안 강화와 사용자 편의성 사이의 기술적 균형점 찾기">
      <div style={{ display: 'flex', gap: '3rem', height: '100%', marginTop: '2rem' }}>
        <div style={{ flex: 1 }}>
           <SlideCard title="The Challenge" icon={<FaExclamationTriangle color="#e67e22" />} style={{ borderTop: '8px solid #e67e22' }}>
              <div style={{ fontSize: '2rem', fontWeight: 900, marginBottom: '1.5rem', color: '#e67e22' }}>액세스 토큰 만료 처리</div>
              <ul style={{ fontSize: '1.6rem', color: '#555', lineHeight: '1.8', paddingLeft: '2rem' }}>
                <li><strong>짧은 토큰 유효기간</strong>: 보안 정책에 따른 Access Token의 주기적 만료</li>
                <li><strong>사용자 경험(UX)의 단절</strong>: 코드 작성 중 발생하는 갑작스러운 로그아웃</li>
                <li><strong>무중단 인증 환경 구축</strong>: 사용자 개입 없이 백그라운드에서 세션을 관리하는 자동화 로직 필요</li>
              </ul>
           </SlideCard>
        </div>
        <div style={{ flex: 1.2 }}>
           <SlideCard title="Implementation" icon={<FaCheckCircle color="#27ae60" />} style={{ borderTop: '8px solid #27ae60' }}>
              <div style={{ fontSize: '2rem', fontWeight: 900, marginBottom: '1.5rem', color: '#27ae60' }}>Silent Refresh & Rotation</div>
              <ul style={{ fontSize: '1.6rem', color: '#555', lineHeight: '2', paddingLeft: '2.5rem' }}>
                <li><strong>Axios Interceptor</strong>: 401 에러 감지 및 자동 갱신 요청</li>
                <li><strong>Refresh Token Rotation</strong>: 탈취 토큰의 오남용 방지 및 피해 최소화</li>
                <li><strong>Promise Queueing</strong>: 다중 API 요청 시 토큰 중복 갱신 방지 및 동기화</li>
                <li><strong>Result</strong>: 사용자 개입 없이도 지속적인 로그인 상태 유지 가능</li>
              </ul>
           </SlideCard>
        </div>
      </div>
    </SlideLayout>
  );
};

export const Slide16Troubleshooting02 = () => {
  return (
    <SlideLayout title="트러블슈팅 #02: SSE 통신과 보안 헤더" subtitle="보안 헤더 주입이 가능한 커스텀 SSE 통신 모듈 구현">
      <div style={{ display: 'flex', gap: '3rem', height: '100%', marginTop: '2rem' }}>
        <div style={{ flex: 1 }}>
           <SlideCard title="The Challenge" icon={<FaExclamationTriangle color="#e67e22" />} style={{ borderTop: '8px solid #e67e22' }}>
              <div style={{ fontSize: '2rem', fontWeight: 900, marginBottom: '1.5rem', color: '#e67e22' }}>EventSource 인증의 한계</div>
              <ul style={{ fontSize: '1.6rem', color: '#555', lineHeight: '1.8', paddingLeft: '2rem' }}>
                <li>표준 <strong>EventSource</strong> 객체는 커스텀 헤더 지원 불가</li>
                <li>스트림 기반 사용자 인증을 위한 Bearer Token 전달의 제약</li>
                <li>Axios의 스트리밍 데이터 처리 안정성 부족</li>
              </ul>
           </SlideCard>
        </div>
        <div style={{ flex: 1.2 }}>
           <SlideCard title="Implementation" icon={<FaCheckCircle color="#27ae60" />} style={{ borderTop: '8px solid #27ae60' }}>
              <div style={{ fontSize: '2rem', fontWeight: 900, marginBottom: '1.5rem', color: '#27ae60' }}>Custom Stream Parser</div>
              <ul style={{ fontSize: '1.6rem', color: '#555', lineHeight: '2', paddingLeft: '2.5rem' }}>
                <li><strong>Fetch API & ReadableStream</strong> 활용 모듈화</li>
                <li><strong>Header Injection</strong>: 커스텀 헤더를 통한 Bearer Token 인증 구현</li>
                <li><strong>Stream Data Parsing</strong>: SSE 데이터 메시지 규격에 따른 실시간 파싱</li>
                <li><strong>Silent Refresh Porting</strong>: Axios 인터셉터 기반의 자동 갱신 로직을 Fetch 커스텀 모듈에 통합 이식</li>
                <li><strong>Graceful Degradation</strong>: 연결 해제 시 자동 재연결 관리</li>
              </ul>
           </SlideCard>
        </div>
      </div>
    </SlideLayout>
  );
};

export const Slide17Troubleshooting03 = () => {
  return (
    <SlideLayout title="트러블슈팅 #03: 반응형 Web IDE 레이아웃" subtitle="제한된 화면 환경을 고려한 모바일 전용 레이아웃 최적화">
      <div style={{ display: 'flex', gap: '3rem', height: '100%', marginTop: '2rem' }}>
        <div style={{ flex: 1 }}>
           <SlideCard title="The Challenge" icon={<FaExclamationTriangle color="#e67e22" />} style={{ borderTop: '8px solid #e67e22' }}>
              <div style={{ fontSize: '2rem', fontWeight: 900, marginBottom: '1.5rem', color: '#e67e22' }}>화면 공간의 절대적 부족</div>
              <ul style={{ fontSize: '1.6rem', color: '#555', lineHeight: '1.8', paddingLeft: '2rem' }}>
                <li>좁은 모바일 화면에서의 에디터 터치 조작 문제</li>
                <li>사이드바, 에디터, 결과창의 동시 노출 불가</li>
              </ul>
           </SlideCard>
        </div>
        <div style={{ flex: 1.2 }}>
           <SlideCard title="Implementation" icon={<FaCheckCircle color="#27ae60" />} style={{ borderTop: '8px solid #27ae60' }}>
              <div style={{ fontSize: '2rem', fontWeight: 900, marginBottom: '1.5rem', color: '#27ae60' }}>Layout Engine Optimization</div>
              <ul style={{ fontSize: '1.6rem', color: '#555', lineHeight: '2', paddingLeft: '2.5rem' }}>
                <li><strong>Hybrid Grid/Flex</strong>: 해상도별 동적 레이아웃 전환</li>
                <li><strong>Mobile Tab UI</strong>: 다중 패널을 탭 인터페이스로 일원화</li>
                <li><strong>Touch-friendly UI</strong>: 모바일 환경을 고려한 버튼 크기 및 조작 편의성 최적화</li>
                <li><strong>Context Preservation</strong>: 탭 전환 시에도 작업 상태 완벽 유지</li>
              </ul>
           </SlideCard>
        </div>
      </div>
    </SlideLayout>
  );
};

export const Slide18Retrospective = () => {
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

export const Slide19Future = () => {
  return (
    <SlideLayout title="향후 확장 계획" subtitle="현재에 머물지 않고 더 넓은 학습 생태계로">
      <div style={{ display: 'flex', gap: '3rem', height: '100%', marginTop: '3rem', justifyContent: 'center', alignItems: 'center' }}>
         {[
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

export const Slide20Conclusion = () => {
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
