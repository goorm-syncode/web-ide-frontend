import React from 'react';
import { SlideLayout, SlideCard, Badge, InfoNode, Grid } from '../components/SlideBase';
import { FaReact, FaLeaf, FaGithub, FaTrello, FaCode, FaRocket, FaUsers, FaCheckCircle, FaBalanceScale, FaComments, FaCloud, FaSync, FaServer, FaDatabase } from 'react-icons/fa';

import logoImg from '../../../assets/logo-gnb.png';
import trelloImg from '../../../assets/trello-screenshot.png';
import githubImg from '../../../assets/github-screenshot.png';

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
        <strong>쉬운 코딩 학습을 위한 Web IDE 플랫폼</strong>
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
    <SlideLayout title="Starting Point (The Common Theme)" subtitle="공통 과제로 주어진 'Web IDE'라는 도전 과제">
      <div style={{ display: 'flex', gap: '4rem', marginTop: '2rem', alignItems: 'center', height: '100%' }}>
        <div style={{ flex: 1.2 }}>
          <SlideCard style={{ background: 'rgba(0, 68, 148, 0.02)', borderLeft: '1rem solid var(--slide-primary)', padding: '3.5rem' }}>
             <h3 style={{ fontSize: '3rem', fontWeight: 800, marginBottom: '2rem' }}>&quot;협업을 위한 범용 Web IDE&quot;</h3>
             <p style={{ fontSize: '2rem', lineHeight: '1.8', color: 'var(--slide-muted)', marginBottom: '3rem', wordBreak: 'keep-all' }}>
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
           <div style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--slide-text)', wordBreak: 'keep-all' }}>
              &quot;기능 구현에만 치중했던<br/>웹 에디터 중심의 보편적 접근&quot;
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
    <SlideLayout title="Strategic Pivot" subtitle="범용적인 협업 도구에서 '학습자 중심의 미션 기반 플랫폼'으로">
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
        
        <p style={{ textAlign: 'center', fontSize: '2.2rem', color: 'var(--slide-muted)', fontStyle: 'italic', wordBreak: 'keep-all' }}>
          &quot;우리의 기술이 어떻게 하면 사용자에게 더 재미있고 유용한 가치가 될지 고민했습니다.&quot;
        </p>
        
        <Grid cols={3} gap="2rem">
           {[
             { l: '명확한 타겟', d: '환경 설정이 낯선 초심자부터 코딩을 배우고 싶은 누구나' },
             { l: '매끄러운 학습 경험', d: '미션 확인부터 코드 제출까지 한 번에 이어지는 자연스러운 흐름' },
             { l: '실시간 소통', d: '궁금한 점을 바로 묻고 답하며 함께 성장하는 즐거움' }
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
          label="연속성 (Seamless Flow)" 
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
    <SlideLayout title="사용자 인터렉션 흐름" subtitle="사용자의 액션에 따른 서비스 내부의 전체적인 흐름">
      <div style={{ display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'center', gap: '4rem', padding: '0 5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4rem' }}>
          <InfoNode 
            icon={<FaUsers />} 
            label="사용자 (Learner)" 
            desc="미션 선택 및 코드 작성" 
            style={{ flex: 1, padding: '3rem' }} 
          />
          <div style={{ fontSize: '4rem', color: 'var(--slide-primary)', fontWeight: 300 }}>↔</div>
          <InfoNode 
            icon={<FaCode />} 
            label="프론트엔드 (Web IDE)" 
            desc="직관적인 개발 환경 및 인터페이스 제공" 
            color="var(--slide-secondary)" 
            style={{ flex: 1, padding: '3rem' }} 
          />
        </div>
        
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <div style={{ fontSize: '4rem', color: '#ccc', transform: 'rotate(90deg)', margin: '-1rem 0' }}>↔</div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4rem' }}>
          <InfoNode 
            icon={<FaServer />} 
            label="컴파일 및 실행 (API)" 
            desc="격리된 환경 기반의 코드 채점 처리" 
            color="#0c8599" 
            style={{ flex: 1, padding: '3rem' }} 
          />
          <div style={{ fontSize: '4rem', color: '#0c8599', fontWeight: 300 }}>↔</div>
          <InfoNode 
            icon={<FaDatabase />} 
            label="기록 및 현황 (Storage)" 
            desc="학습 결과 기록 및 성장 현황 관리" 
            color="#6DB33F" 
            style={{ flex: 1, padding: '3rem' }} 
          />
        </div>
      </div>
    </SlideLayout>
  );
};

export const Slide04Team = () => {
  const [modalImg, setModalImg] = React.useState(null);

  return (
    <SlideLayout title="협업 및 개발 타임라인" subtitle="약 4주의 체계적인 스크럼 운영">
      <div style={{ display: 'flex', flexDirection: 'column', gap: '5rem', marginTop: '3rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', position: 'relative' }}>
          <div style={{ position: 'absolute', top: '50px', left: 0, right: 0, height: '8px', background: '#eee', borderRadius: '4px', zIndex: 0 }}></div>
          {[
            { w: 'W1', t: '기획 및 설계', d: '요구사항 정의 / 아키텍처 수립', c: 'var(--slide-primary)' },
            { w: 'W2', t: '코어 앱 개발', d: '주요 UI 컴포넌트 및 서비스 로직 구현', c: 'var(--slide-primary)' },
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
          <SlideCard 
            title="Trello" 
            icon={<FaTrello color="#0052CC"/>}
            onClick={() => setModalImg(trelloImg)}
            style={{ cursor: 'pointer', transition: 'transform 0.2s', border: '1px solid transparent' }}
            onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-10px)'; e.currentTarget.style.borderColor = '#0052CC'; }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = 'transparent'; }}
          >
            <div style={{ fontSize: '1.8rem' }}>칸반 기반 <strong>태스크 시각화</strong></div>
            <div style={{ fontSize: '1.2rem', color: '#888', marginTop: '1rem' }}>💡 클릭하여 스크린샷 보기</div>
          </SlideCard>
          <SlideCard 
            title="GitHub" 
            icon={<FaGithub color="#181717"/>}
            onClick={() => setModalImg(githubImg)}
            style={{ cursor: 'pointer', transition: 'transform 0.2s', border: '1px solid transparent' }}
            onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-10px)'; e.currentTarget.style.borderColor = '#181717'; }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = 'transparent'; }}
          >
            <div style={{ fontSize: '1.8rem' }}>PR 중심의 <strong>코드 리뷰 협업</strong></div>
            <div style={{ fontSize: '1.2rem', color: '#888', marginTop: '1rem' }}>💡 클릭하여 스크린샷 보기</div>
          </SlideCard>
          <SlideCard title="Scrum" icon={<FaUsers color="var(--slide-secondary)"/>}>
            <div style={{ fontSize: '1.8rem' }}>코어 협업 시간 시작 시 <strong>스크럼 진행</strong></div>
            <div style={{ fontSize: '1.2rem', color: '#888', marginTop: '1rem' }}>진행 상황 및 데일리 목표 공유</div>
          </SlideCard>
        </Grid>
      </div>

      {modalImg && (
        <div 
          onClick={(e) => { if (e.target === e.currentTarget) setModalImg(null); }}
          style={{
            position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
            background: 'rgba(0,0,0,0.85)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: '5rem', cursor: 'zoom-out', backdropFilter: 'blur(5px)'
          }}
        >
          <div style={{ 
            maxWidth: '90%', maxHeight: '90%', borderRadius: '24px', overflow: 'hidden', background: '#fff',
            boxShadow: '0 30px 60px rgba(0,0,0,0.5)', position: 'relative', display: 'flex', flexDirection: 'column'
          }}>
            <button 
              onClick={() => setModalImg(null)}
              style={{ position: 'absolute', top: '2rem', right: '2rem', background: '#fff', border: 'none', borderRadius: '50%', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: '0 5px 15px rgba(0,0,0,0.2)', fontSize: '2rem', zIndex: 10 }}
            >
              ✕
            </button>
            <div style={{ overflowY: 'auto', width: '100%', display: 'flex', justifyContent: 'center' }}>
               <img 
                 src={modalImg} 
                 alt="Screenshot" 
                 style={{ 
                   width: '100%', height: 'auto', display: 'block',
                   ...(modalImg === githubImg ? { objectFit: 'cover', objectPosition: 'center top' } : { objectFit: 'contain' })
                 }} 
               />
            </div>
          </div>
        </div>
      )}
    </SlideLayout>
  );
};

export const Slide05TechStack = () => {
  return (
    <SlideLayout title="기술 스택 (Tech Stack)" subtitle="안정적인 서비스 구현과 개발 효율성을 위한 기술 구성">
      <Grid cols={3} gap="3rem" style={{ marginTop: '2rem' }}>
        <SlideCard title="Frontend" icon={<FaReact color="#61DAFB"/>} style={{ borderTop: '0.8rem solid #61DAFB' }}>
           <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginTop: '1.5rem' }}>
              <Badge>React 19 & Vite</Badge>
              <Badge>JavaScript</Badge>
              <Badge>Monaco Editor</Badge>
              <Badge>Axios</Badge>
              <Badge>Vanilla CSS</Badge>
           </div>
        </SlideCard>
        <SlideCard title="Backend" icon={<FaLeaf color="#6DB33F"/>} style={{ borderTop: '0.8rem solid #6DB33F' }}>
           <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginTop: '1.5rem' }}>
              <Badge variant="accent">Java 21</Badge>
              <Badge variant="accent">Spring Boot 3.5</Badge>
              <Badge variant="accent">Spring Data JPA</Badge>
              <Badge variant="accent">SSE Broadcast</Badge>
              <Badge variant="accent">Swagger (OpenAPI 3)</Badge>
           </div>
        </SlideCard>
        <SlideCard title="Cloud & DevOps" icon={<FaCloud color="#FF9900"/>} style={{ borderTop: '0.8rem solid #FF9900' }}>
           <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.2rem', marginTop: '1.5rem' }}>
              <div style={{ width: '100%', background: 'rgba(255, 153, 0, 0.05)', padding: '1.5rem', borderRadius: '16px', border: '1px solid rgba(255, 153, 0, 0.2)' }}>
                 <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#FF9900', marginBottom: '1rem' }}>AWS Cloud Infrastructure</div>
                 <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.8rem' }}>
                    {['EC2', 'S3', 'RDS', 'CloudFront', 'ECR'].map(s => (
                       <span key={s} style={{ fontSize: '1.2rem', padding: '0.4rem 1rem', borderRadius: '8px', background: '#fff', color: '#555', fontWeight: 700, boxShadow: '0 2px 4px rgba(255,153,0,0.1)', border: '1px solid #eee' }}>{s}</span>
                    ))}
                 </div>
              </div>
              <Badge variant="secondary">GitHub Actions (CI/CD)</Badge>
              <Badge variant="secondary">Docker</Badge>
           </div>
        </SlideCard>
      </Grid>
    </SlideLayout>
  );
};

export const Slide06Tradeoff = () => {
  return (
    <SlideLayout title="기술 선택의 기준" subtitle="실무적인 개발 효율성과 안정적인 서비스 구현 사이의 기술적 균형">
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', marginTop: '1rem' }}>
        <SlideCard title="JavaScript + PropTypes" icon={<FaBalanceScale />} style={{ background: 'rgba(0, 68, 148, 0.02)' }}>
          <div style={{ marginBottom: '1rem', fontWeight: 800 }}>TypeScript 대신 <strong>현실적인 개발 생산성</strong> 선택</div>
          <ul style={{ fontSize: '1.6rem', lineHeight: '1.6', paddingLeft: '2rem', color: 'var(--slide-muted)' }}>
            <li>초기 세팅 비용 최소화 및 빠른 개발 속도 확보</li>
            <li>ESLint + PropTypes를 통한 안정성 보완</li>
          </ul>
        </SlideCard>
        <SlideCard title="Vanilla CSS" icon={<FaCode />} style={{ background: 'rgba(0, 137, 123, 0.02)' }}>
           <div style={{ marginBottom: '1rem', fontWeight: 800 }}>Tailwind 대신 <strong>독자적 디자인 시스템</strong> 선택</div>
           <ul style={{ fontSize: '1.6rem', lineHeight: '1.6', paddingLeft: '2rem', color: 'var(--slide-muted)' }}>
            <li>디테일한 사용자 경험 구현을 위한 자유로운 스타일링</li>
            <li>CSS Variables를 활용한 일관된 테마 관리</li>
          </ul>
        </SlideCard>
        <SlideCard title="React (Vite / CSR)" icon={<FaReact />} style={{ background: 'rgba(97, 218, 251, 0.02)', borderTop: '5px solid #61DAFB' }}>
           <div style={{ marginBottom: '1rem', fontWeight: 800 }}>Next.js 대신 <strong>핵심 기능 구현 및 생산성</strong> 집중</div>
           <ul style={{ fontSize: '1.6rem', lineHeight: '1.6', paddingLeft: '2rem', color: 'var(--slide-muted)' }}>
            <li>프레임워크의 불필요한 복잡성을 배제하여 개발 속도 극대화</li>
            <li>Vite 기반의 고속 빌드와 쉽고 직관적인 개발 환경 구축</li>
          </ul>
        </SlideCard>
        <SlideCard title="SSE (Server-Sent Events)" icon={<FaSync />} style={{ background: 'rgba(111, 66, 193, 0.02)', borderTop: '5px solid #6f42c1' }}>
           <div style={{ marginBottom: '1rem', fontWeight: 800 }}>WebSocket의 <strong>복잡함 대신 실시간 메시지</strong>에 충실한 선택</div>
           <ul style={{ fontSize: '1.6rem', lineHeight: '1.6', paddingLeft: '2rem', color: 'var(--slide-muted)' }}>
            <li>HTTP 표준 활용으로 인프라 이슈 최소화 및 개발 효율성 확보</li>
            <li>실시간 채팅 및 알림 수신에 최적화된 안정적인 데이터 스트리밍</li>
          </ul>
        </SlideCard>
      </div>
    </SlideLayout>
  );
};
