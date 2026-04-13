import React from 'react';
import { SlideLayout, SlideCard, Badge, InfoNode, Grid } from '../components/SlideBase';
import { FaReact, FaLeaf, FaGithub, FaTrello, FaCode, FaRocket, FaUsers, FaCheckCircle, FaBalanceScale, FaComments, FaCloud, FaLaptopCode, FaSync } from 'react-icons/fa';

import logoImg from '../../../assets/logo-gnb.png';

export const Slide01Cover = () => {
  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', position: 'relative' }}>
      <div style={{ position: 'absolute', top: '10%', left: '10%', opacity: 0.1, fontSize: '20rem', transform: 'rotate(-15deg)' }}>
        <FaCode />
      </div>
      
      <img src={logoImg} alt="Learn Code Logo" style={{ width: '150px', marginBottom: '3rem' }} />
      <h1 style={{ fontSize: '7rem', fontWeight: 900, color: 'var(--slide-primary)', letterSpacing: '-0.05em', marginBottom: '2rem' }}>
        Learn Code
      </h1>
      <p style={{ fontSize: '3rem', color: 'var(--slide-muted)', fontWeight: 500 }}>
        코딩 학습 경험을 위한 <strong>몰입형 Web IDE 플랫폼</strong>
      </p>
      
      <div style={{ marginTop: '5rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2rem' }}>
        <div style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--slide-primary)', display: 'flex', alignItems: 'center', gap: '2rem' }}>
           Team. Sync Code
        </div>
        <p style={{ fontSize: '1.8rem', color: 'var(--slide-muted)', maxWidth: '800px', lineHeight: '1.8', textAlign: 'center' }}>
          &quot;코드로 소통하고(Sync), 함께 성장하는 환경을 만든다&quot;는 의미를 담아<br/>
          팀원들 간의 완벽한 코드 동기화와 협업의 가치를 추구합니다.
        </p>
        <div style={{ display: 'flex', gap: '2rem', marginTop: '1rem' }}>
           <Badge style={{ padding: '1rem 3rem' }}>Member 1 (Leader)</Badge>
           <Badge style={{ padding: '1rem 3rem' }}>Member 2</Badge>
           <Badge style={{ padding: '1rem 3rem' }}>Member 3</Badge>
        </div>
      </div>
    </div>
  );
};

export const Slide01StartingPoint = () => {
  return (
    <SlideLayout title="Starting Point (The Common Theme)" subtitle="모두에게 주어진 'Web IDE'라는 도전 과제">
      <div style={{ display: 'flex', gap: '4rem', marginTop: '2rem', alignItems: 'center', height: '100%' }}>
        <div style={{ flex: 1.2 }}>
          <SlideCard style={{ background: 'rgba(0, 68, 148, 0.02)', borderLeft: '1rem solid var(--slide-primary)', padding: '3.5rem' }}>
             <h3 style={{ fontSize: '3rem', fontWeight: 800, marginBottom: '2rem' }}>&quot;협업을 위한 범용 Web IDE&quot;</h3>
             <p style={{ fontSize: '2rem', lineHeight: '1.8', color: 'var(--slide-muted)', marginBottom: '3rem' }}>
                이번 프로젝트의 공통 주제는 Web IDE였습니다.<br/>
                초기 기획은 브라우저 환경에서 여러 사용자가 함께<br/>
                코드를 작성하고 관리하는 범용 협업 도구를 구축하는 것이었습니다.
             </p>
             <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
                <Badge>공통 주제: Web IDE</Badge>
                <Badge>범용 협업 도구</Badge>
                <Badge>브라우저 개발 환경</Badge>
             </div>
          </SlideCard>
        </div>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '2rem', textAlign: 'center' }}>
           <div style={{ fontSize: '5rem', color: 'var(--slide-primary)', marginBottom: '1rem' }}><FaUsers /></div>
           <div style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--slide-text)' }}>
              &quot;모두가 코드를 쓰고 공유하는<br/>가장 표준적인 접근&quot;
           </div>
           <p style={{ fontSize: '1.8rem', color: 'var(--slide-muted)' }}>
              우리는 이 지점에서 더 깊은 고민을 시작했습니다.
           </p>
        </div>
      </div>
    </SlideLayout>
  );
};

export const Slide02Pivot = () => {
  return (
    <SlideLayout title="Strategic Pivot" subtitle="범용적인 협업 도구에서 '사용자 정의 학습 플랫폼'으로">
      <div style={{ display: 'flex', flexDirection: 'column', gap: '3.5rem', marginTop: '1rem' }}>
        <div style={{ display: 'flex', gap: '3rem', alignItems: 'center', justifyContent: 'center' }}>
           <div style={{ background: '#eee', padding: '2.5rem 4rem', borderRadius: '24px', opacity: 0.6, textAlign: 'center' }}>
              <div style={{ fontSize: '1.8rem', fontWeight: 700, color: '#666' }}>Initial Concept</div>
              <div style={{ fontSize: '2.5rem', fontWeight: 800 }}>협업형 Web IDE</div>
           </div>
           <div style={{ fontSize: '4.5rem', color: 'var(--slide-accent)', fontWeight: 300 }}>➔</div>
           <div style={{ background: 'rgba(244, 81, 30, 0.1)', padding: '3.5rem 5rem', borderRadius: '32px', border: '3px solid var(--slide-accent)', textAlign: 'center', boxShadow: 'var(--slide-shadow-lg)' }}>
              <div style={{ fontSize: '1.8rem', fontWeight: 700, color: 'var(--slide-accent)' }}>The Value Pivot</div>
              <div style={{ fontSize: '3.5rem', fontWeight: 900, color: 'var(--slide-accent)' }}>코딩 학습 플랫폼</div>
           </div>
        </div>
        
        <p style={{ textAlign: 'center', fontSize: '2.2rem', color: 'var(--slide-muted)', fontStyle: 'italic' }}>
          &quot;단순한 기능 구현을 넘어, 실제로 누가 어떤 가치를 느끼는가에 집중했습니다.&quot;
        </p>
        
        <Grid cols={3} gap="2rem">
           {[
             { l: '명확한 타겟', d: '환경 설정이 낯선 초심자부터 코딩을 배우고 싶은 누구나' },
             { l: '통합된 경험', d: '문제 탐색부터 제출까지 중단 없는 흐름' },
             { l: '실시간 가치', d: '학습자들 간의 실시간 소통을 통한 동반 성장' }
           ].map((v, i) => (
             <SlideCard key={i} style={{ padding: '2.5rem' }}>
                <div style={{ fontSize: '2.2rem', fontWeight: 800, color: 'var(--slide-primary)', marginBottom: '1rem' }}>{v.l}</div>
                <div style={{ fontSize: '1.5rem', color: 'var(--slide-muted)' }}>{v.d}</div>
             </SlideCard>
           ))}
        </Grid>
      </div>
    </SlideLayout>
  );
};

export const Slide02Why = () => {
  return (
    <SlideLayout title="왜 이 프로젝트를 만들었는가?" subtitle="Web IDE라는 공통 주제 안에서 '학습 플랫폼'으로의 확장">
      <div style={{ display: 'flex', gap: '3rem', marginTop: '4rem', height: '100%' }}>
        <InfoNode 
          icon={<FaRocket />} 
          label="몰입 (Immersion)" 
          desc="탐색부터 제출까지 연속적인 사용자 경험"
          style={{ flex: 1, padding: '4rem' }}
        />
        <InfoNode 
          icon={<FaCode />} 
          label="즉시성 (Immediacy)" 
          desc="환경 설정 없는 즉각적인 피드백 루프"
          color="var(--slide-secondary)"
          style={{ flex: 1, padding: '4rem' }}
        />
        <InfoNode 
          icon={<FaCheckCircle />} 
          label="학습 지속성 (Continuity)" 
          desc="진행률 관리와 오답 노트 중심의 성취감"
          color="var(--slide-accent)"
          style={{ flex: 1, padding: '4rem' }}
        />
      </div>
    </SlideLayout>
  );
};

export const Slide03Overview = () => {
  return (
    <SlideLayout title="Web IDE Learning Loop" subtitle="개인 학습과 소통이 순환되는 구조">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', gap: '2rem' }}>
        {[
          { icon: <FaUsers />, label: "학습 시작", color: 'var(--slide-primary)' },
          { icon: <FaCode />, label: "몰입 학습", color: 'var(--slide-secondary)' },
          { icon: <FaCheckCircle />, label: "결과/기록", color: 'var(--slide-accent)' },
          { icon: <FaComments />, label: "양방향 피드백", color: '#6f42c1' }
        ].map((step, idx) => (
          <React.Fragment key={idx}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '220px' }}>
              <div style={{ 
                width: '160px', height: '160px', borderRadius: '40px', background: step.color, color: '#fff', 
                display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '5rem',
                boxShadow: 'var(--slide-shadow-lg)', marginBottom: '2rem' 
              }}>
                {step.icon}
              </div>
              <div style={{ fontSize: '2.2rem', fontWeight: 800, color: step.color }}>{step.label}</div>
            </div>
            {idx < 3 && <div style={{ fontSize: '4rem', color: '#ccc', fontWeight: 300 }}>➔</div>}
          </React.Fragment>
        ))}
      </div>
      <div style={{ position: 'relative', height: '100px', marginTop: '2rem', display: 'flex', justifyContent: 'center' }}>
        <div style={{ 
          position: 'absolute', top: '-140px', left: '110px', right: '110px', height: '170px', 
          border: '3px dashed #6f42c1', borderTop: 'none', borderRadius: '0 0 100px 100px', 
          zIndex: 0, opacity: 0.3
        }}>
           <div style={{ position: 'absolute', left: '-12px', top: '-10px', fontSize: '2.5rem', color: '#6f42c1', transform: 'rotate(-90deg)' }}>▲</div>
        </div>
        <div style={{ 
          textAlign: 'center', fontSize: '1.8rem', fontWeight: 800, color: '#6f42c1', 
          background: 'rgba(111, 66, 193, 0.1)', padding: '1rem 3rem', borderRadius: '50px',
          position: 'relative', zIndex: 1, marginTop: '20px'
        }}>
           기록과 소통이 다시 새로운 학습의 동기로 이어지는 선순환 루프
        </div>
      </div>
    </SlideLayout>
  );
};

export const Slide04Team = () => {
  return (
    <SlideLayout title="협업 및 개발 타임라인" subtitle="약 4주의 체계적인 스크럼 운영">
      <div style={{ display: 'flex', flexDirection: 'column', gap: '5rem', marginTop: '3rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', position: 'relative' }}>
          <div style={{ position: 'absolute', top: '50px', left: 0, right: 0, height: '8px', background: '#eee', borderRadius: '4px', zIndex: 0 }}></div>
          {[
            { w: 'W1', t: '기획 및 설계', d: '요구사항 정의 / 아키텍처 수립', c: 'var(--slide-primary)' },
            { w: 'W2', t: '코어 앱 개발', d: 'IDE 및 API 서버 개발', c: 'var(--slide-primary)' },
            { w: 'W3', t: '기능 통합/배포', d: 'SSE 연동 및 CI/CD 인프라 구축', c: 'var(--slide-accent)' },
            { w: 'W4', t: '안정화 및 고도화', d: 'UX 폴리싱 및 시스템 성능 최적화', c: 'var(--slide-secondary)' }
          ].map((item, idx) => (
            <div key={idx} style={{ position: 'relative', zIndex: 1, textAlign: 'center', width: '22%' }}>
              <div style={{ width: '100px', height: '100px', borderRadius: '50%', background: item.c, border: '8px solid #fff', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 2rem', fontSize: '2rem', fontWeight: 900, boxShadow: 'var(--slide-shadow)' }}>{item.w}</div>
              <div style={{ fontSize: '1.8rem', fontWeight: 800 }}>{item.t}</div>
              <div style={{ fontSize: '1.2rem', color: 'var(--slide-muted)', marginTop: '0.8rem' }}>{item.d}</div>
            </div>
          ))}
        </div>
        
        <Grid cols={3} gap="3rem">
          <SlideCard title="Trello" icon={<FaTrello color="#0052CC"/>}>
            <div style={{ fontSize: '1.8rem' }}>칸반 기반 <strong>태스크 시각화</strong></div>
          </SlideCard>
          <SlideCard title="GitHub" icon={<FaGithub color="#181717"/>}>
            <div style={{ fontSize: '1.8rem' }}>PR 중심의 <strong>코드 리뷰 협업</strong></div>
          </SlideCard>
          <SlideCard title="Scrum" icon={<FaUsers color="var(--slide-secondary)"/>}>
            <div style={{ fontSize: '1.8rem' }}>매일 아침 <strong>스크럼 미팅</strong></div>
          </SlideCard>
        </Grid>
      </div>
    </SlideLayout>
  );
};

export const Slide05TechStack = () => {
  return (
    <SlideLayout title="기술 스택 (Tech Stack)" subtitle="검증된 기술로 구축한 고성능 웹 환경">
      <Grid cols={3} gap="3rem" style={{ marginTop: '2rem' }}>
        <SlideCard title="Frontend" icon={<FaReact color="#61DAFB"/>} style={{ borderTop: '1rem solid #61DAFB' }}>
           <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginTop: '1.5rem' }}>
              <Badge>React 19 & Vite</Badge>
              <Badge>JavaScript</Badge>
              <Badge>Monaco Editor</Badge>
              <Badge>Vanilla CSS</Badge>
           </div>
        </SlideCard>
        <SlideCard title="Backend" icon={<FaLeaf color="#6DB33F"/>} style={{ borderTop: '1rem solid #6DB33F' }}>
           <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginTop: '1.5rem' }}>
              <Badge variant="accent">Java 21</Badge>
              <Badge variant="accent">Spring Boot 3.5</Badge>
              <Badge variant="accent">Spring Data JPA</Badge>
              <Badge variant="accent">SSE Broadcast</Badge>
           </div>
        </SlideCard>
        <SlideCard title="Cloud & DevOps" icon={<FaCloud color="#FF9900"/>} style={{ borderTop: '1rem solid #FF9900' }}>
           <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginTop: '1.5rem' }}>
              <Badge>AWS (S3/EC2/RDS)</Badge>
              <Badge>CloudFront</Badge>
              <Badge>AWS ECR</Badge>
              <Badge>GitHub Actions</Badge>
              <Badge>Docker</Badge>
           </div>
        </SlideCard>
      </Grid>
    </SlideLayout>
  );
};

export const Slide06Tradeoff = () => {
  return (
    <SlideLayout title="기술 선택의 기준" subtitle="개발 효율성과 핵심 사용자 경험(UX) 사이의 균형">
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', marginTop: '1rem' }}>
        <SlideCard title="JS + PropTypes" icon={<FaBalanceScale />} style={{ background: 'rgba(0, 68, 148, 0.02)' }}>
          <div style={{ marginBottom: '1rem', fontWeight: 800 }}>TS 대신 <strong>현실적인 개발 생산성</strong> 선택</div>
          <ul style={{ fontSize: '1.6rem', lineHeight: '1.6', paddingLeft: '2rem', color: 'var(--slide-muted)' }}>
            <li>초기 세팅 비용 최소화 및 빠른 이터레이션</li>
            <li>ESLint + PropTypes를 통한 안정성 보완</li>
          </ul>
        </SlideCard>
        <SlideCard title="Vanilla CSS" icon={<FaCode />} style={{ background: 'rgba(0, 137, 123, 0.02)' }}>
           <div style={{ marginBottom: '1rem', fontWeight: 800 }}>Tailwind 대신 <strong>독자적 디자인 시스템</strong> 선택</div>
           <ul style={{ fontSize: '1.6rem', lineHeight: '1.6', paddingLeft: '2rem', color: 'var(--slide-muted)' }}>
            <li>복잡한 IDE 레이아웃 미세 제어 및 최적화</li>
            <li>CSS Variables를 활용한 일관된 테마 관리</li>
          </ul>
        </SlideCard>
        <SlideCard title="Monaco Editor" icon={<FaLaptopCode />} style={{ background: 'rgba(233, 30, 99, 0.02)', borderTop: '5px solid #E91E63' }}>
           <div style={{ marginBottom: '1rem', fontWeight: 800 }}>경량보다 <strong>전문적인 에디팅 경험</strong> 선택</div>
           <ul style={{ fontSize: '1.6rem', lineHeight: '1.6', paddingLeft: '2rem', color: 'var(--slide-muted)' }}>
            <li>VS Code와 동일한 접근성 및 자동완성 지원</li>
            <li>풍부한 API 기반의 실시간 코드 분석 연동</li>
          </ul>
        </SlideCard>
        <SlideCard title="SSE (Server-Sent Events)" icon={<FaSync />} style={{ background: 'rgba(111, 66, 193, 0.02)', borderTop: '5px solid #6f42c1' }}>
           <div style={{ marginBottom: '1rem', fontWeight: 800 }}>WS 대신 <strong>간결하고 효용 중심</strong>의 통신 선택</div>
           <ul style={{ fontSize: '1.6rem', lineHeight: '1.6', paddingLeft: '2rem', color: 'var(--slide-muted)' }}>
            <li>HTTP 기반의 단순한 구현 및 자동 재연결</li>
            <li>채팅 및 알림 전송을 위한 자원 소모 최소화</li>
          </ul>
        </SlideCard>
      </div>
    </SlideLayout>
  );
};
