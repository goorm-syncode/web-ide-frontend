import React from 'react';
import { SlideLayout, SlideCard, Arrow, InfoNode } from '../components/SlideBase';
import { FaDatabase, FaGlobe, FaDesktop, FaCode, FaRobot, FaSync, FaCheckCircle, FaRocket, FaShieldAlt, FaComments, FaUsers, FaArrowRight } from 'react-icons/fa';




const FlowArrow = () => (
  <div style={{ display: 'flex', alignItems: 'center', color: '#ccc', fontSize: '2rem' }}>
    <FaArrowRight />
  </div>
);

// AWS Official Style Custom Icons
const AWSS3Icon = () => (
  <svg width="60" height="60" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M50 10L15 25V75L50 90L85 75V25L50 10Z" fill="#569A31" fillOpacity="0.1" stroke="#569A31" strokeWidth="4"/>
    <ellipse cx="50" cy="28" rx="30" ry="12" stroke="#569A31" strokeWidth="4" fill="#fff"/>
    <path d="M20 28V60C20 66.6 33.4 72 50 72C66.6 72 80 66.6 80 60V28" stroke="#569A31" strokeWidth="4" fill="none"/>
  </svg>
);

const AWSEC2Icon = () => (
  <svg width="60" height="60" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="15" y="15" width="70" height="70" rx="4" stroke="#FF9900" strokeWidth="5" fill="#FF9900" fillOpacity="0.1"/>
    <rect x="30" y="30" width="40" height="40" stroke="#FF9900" strokeWidth="4" fill="#fff"/>
    <path d="M15 50H30M70 50H85M50 15V30M50 70V85" stroke="#FF9900" strokeWidth="4" strokeLinecap="round"/>
  </svg>
);

const AWSRDSIcon = () => (
  <svg width="60" height="60" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="15" y="15" width="70" height="70" rx="35" stroke="#527FFF" strokeWidth="5" fill="#527FFF" fillOpacity="0.1"/>
    <ellipse cx="50" cy="35" rx="20" ry="8" stroke="#527FFF" strokeWidth="4" fill="#fff"/>
    <path d="M30 35V65C30 69.4 39 73 50 73C61 73 70 69.4 70 65V35" stroke="#527FFF" strokeWidth="4" fill="none"/>
    <path d="M30 50C30 54.4 39 58 50 58C61 58 70 54.4 70 50" stroke="#527FFF" strokeWidth="4" fill="none"/>
  </svg>
);

const AWSCloudFrontIcon = () => (
  <svg width="60" height="60" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M20 60C20 45 35 40 40 30C45 20 65 20 75 35C85 30 95 45 90 60H20Z" stroke="#569A31" strokeWidth="4" fill="#569A31" fillOpacity="0.1"/>
    <path d="M40 70L50 85L60 70" stroke="#569A31" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M50 35V85" stroke="#569A31" strokeWidth="4" strokeDasharray="4 4"/>
  </svg>
);

export const Slide07Architecture = () => {
  return (
    <SlideLayout title="전체 시스템 아키텍처" subtitle="부하 분산과 안정성을 고려한 별도의 채점 인프라 구성">
      <div style={{ display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'center', gap: '2rem', padding: '1rem' }}>
        
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '2rem' }}>
           
           {/* Layer 1: Users */}
           <div style={{ textAlign: 'center' }}>
              <div style={{ background: '#fff', padding: '1.5rem', borderRadius: '24px', boxShadow: 'var(--slide-shadow)', border: '1px solid #eee' }}>
                 <FaDesktop style={{ fontSize: '3.5rem', color: 'var(--slide-primary)' }} />
                 <div style={{ marginTop: '0.8rem', fontWeight: 800, fontSize: '1.2rem' }}>User Browser</div>
              </div>
           </div>
           <FlowArrow />

           {/* Layer 2: Edge Location */}
           <div style={{ background: 'rgba(0,0,0,0.02)', padding: '2rem', borderRadius: '32px', border: '2px dashed #ccc', position: 'relative' }}>
              <div style={{ position: 'absolute', top: '-1.2rem', left: '1.2rem', background: '#333', color: '#fff', padding: '0.3rem 1.5rem', borderRadius: '8px', fontSize: '1rem', fontWeight: 800 }}>Edge Location</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'center' }}>
                 <AWSCloudFrontIcon />
                 <div style={{ fontWeight: 900, color: '#569A31', fontSize: '1.4rem' }}>CloudFront</div>
                 <div style={{ fontSize: '1rem', color: '#888' }}>Global Edge Layer</div>
              </div>
           </div>

           <FlowArrow />

           {/* Layer 3: Amazon VPC */}
           <div style={{ background: 'rgba(255, 153, 0, 0.02)', padding: '3.5rem 2.5rem', borderRadius: '40px', border: '3px solid #FF9900', position: 'relative', display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
              <div style={{ position: 'absolute', top: '-1.5rem', left: '3rem', background: '#FF9900', color: '#fff', padding: '0.4rem 2rem', borderRadius: '10px', fontSize: '1.2rem', fontWeight: 900 }}>Amazon VPC</div>
              
              {/* Public Subnet: Combined FE & Backend Services */}
              <div style={{ background: '#fff', padding: '2.5rem', borderRadius: '32px', border: '2px dotted rgba(82, 127, 255, 0.3)', position: 'relative' }}>
                 <div style={{ position: 'absolute', top: '-1.1rem', left: '1.5rem', background: '#E3F2FD', border: '1px solid #90CAF9', color: '#1565C0', padding: '0.2rem 1.2rem', borderRadius: '20px', fontSize: '0.9rem', fontWeight: 800 }}>Public Subnet</div>
                 <div style={{ display: 'flex', gap: '3rem', alignItems: 'center', justifyContent: 'center' }}>
                    
                    {/* S3 */}
                    <div style={{ textAlign: 'center' }}>
                       <AWSS3Icon />
                       <div style={{ fontWeight: 800, fontSize: '1.2rem', marginTop: '0.5rem', color: '#569A31' }}>S3 (FE Hosting)</div>
                    </div>

                    <div style={{ width: '2px', height: '60px', background: '#eee' }}></div>

                    {/* Backend EC2 */}
                    <div style={{ textAlign: 'center', position: 'relative' }}>
                       <AWSEC2Icon />
                       <div style={{ fontWeight: 800, fontSize: '1.2rem', marginTop: '0.5rem', color: '#FF9900' }}>Application Server</div>
                       <div style={{ background: '#6f42c1', color: '#fff', padding: '0.2rem 0.8rem', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 800, position: 'absolute', top: '-1.2rem', right: '-1.2rem', boxShadow: '0 4px 10px rgba(0,0,0,0.1)' }}>API / SSE</div>
                    </div>

                    {/* Delegation Arrow */}
                    <div style={{ color: '#FF9900', fontSize: '2.5rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
                       <FaSync style={{ animation: 'spin 4s linear infinite' }} />
                       <div style={{ fontSize: '0.9rem', fontWeight: 900, opacity: 0.6 }}>Task</div>
                    </div>

                    {/* Code Execution Server */}
                    <div style={{ textAlign: 'center', padding: '1.5rem', background: 'rgba(217, 72, 15, 0.03)', borderRadius: '20px', border: '1px solid #d9480f' }}>
                       <AWSEC2Icon />
                       <div style={{ fontWeight: 800, fontSize: '1.2rem', marginTop: '0.5rem', color: '#d9480f' }}>Code Execution</div>
                       <div style={{ fontSize: '0.9rem', color: '#d9480f', opacity: 0.7 }}>Isolated Instance</div>
                    </div>

                 </div>
              </div>

              {/* Private Database Subnet */}
              <div style={{ background: '#fff', padding: '1.5rem 2.5rem', borderRadius: '24px', border: '2px dotted rgba(150, 150, 150, 0.3)', position: 'relative', alignSelf: 'center', display: 'flex', alignItems: 'center', gap: '2rem' }}>
                 <div style={{ position: 'absolute', top: '-1.1rem', left: '1.5rem', background: '#F5F5F5', border: '1px solid #E0E0E0', color: '#616161', padding: '0.2rem 1.2rem', borderRadius: '20px', fontSize: '0.9rem', fontWeight: 800 }}>Private Subnet</div>
                 <AWSRDSIcon />
                 <div style={{ textAlign: 'left' }}>
                    <div style={{ fontWeight: 800, fontSize: '1.3rem', color: '#527FFF' }}>RDS (MySQL)</div>
                    <div style={{ fontSize: '1rem', color: '#666' }}>Managed Database Service</div>
                 </div>
              </div>

           </div>

        </div>

        <div style={{ textAlign: 'center', marginTop: '3rem', fontSize: '1.6rem', color: '#777', fontWeight: 600 }}>
           <span style={{ color: '#569A31' }}>●</span> 고성능 에지 캐싱 및 정적 자원 호스팅 &nbsp;&nbsp;&nbsp;
           <span style={{ color: '#d9480f' }}>●</span> 부하 분산 및 보안을 위한 독립 채점 서버 운영
        </div>
      </div>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </SlideLayout>
  );
};

export const Slide08BackendArch = () => {
  return (
    <SlideLayout title="백엔드 서비스 아키텍처" subtitle="표준적인 계층 설계와 주요 기술 전략을 반영한 백엔드 시스템 구조">
      <div style={{ display: 'flex', gap: '3rem', height: '100%', marginTop: '1rem', alignItems: 'flex-start' }}>
        <div style={{ flex: 1.3, display: 'flex', flexDirection: 'column', gap: '1rem', height: '100%' }}>
          {[
            { label: 'Web / REST Controller', bg: '#f8f9fa', border: 'var(--slide-primary)', icon: <FaGlobe /> },
            { label: 'Security (JWT Filter)', bg: 'rgba(0, 68, 148, 0.05)', border: 'var(--slide-primary)', icon: <FaShieldAlt /> },
            { label: 'Service / Domain Logic', bg: 'rgba(0, 137, 123, 0.05)', border: 'var(--slide-secondary)', icon: <FaCode /> },
            { label: 'Data / Repository Layer', bg: 'rgba(244, 81, 30, 0.05)', border: 'var(--slide-accent)', icon: <FaDatabase /> }
          ].map((layer, idx) => (
             <React.Fragment key={idx}>
               <div style={{ 
                 background: layer.bg, padding: '1.5rem 2.5rem', borderRadius: '20px', border: `3px solid ${layer.border}`,
                 display: 'flex', alignItems: 'center', gap: '2rem', boxShadow: 'var(--slide-shadow)'
               }}>
                 <div style={{ fontSize: '3rem', color: layer.border }}>{layer.icon}</div>
                 <div style={{ fontSize: '2rem', fontWeight: 900, color: layer.border }}>{layer.label}</div>
               </div>
               {idx < 3 && <div style={{ textAlign: 'center', fontSize: '1.5rem', color: '#ccc', margin: '-0.5rem 0' }}>▼</div>}
             </React.Fragment>
          ))}
        </div>

        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '2rem' }}>
           <SlideCard title="핵심 설계 전략" icon={<FaCheckCircle />} style={{ padding: '2.5rem' }}>
              <ul style={{ fontSize: '1.8rem', lineHeight: '2', paddingLeft: '2rem' }}>
                <li style={{ wordBreak: 'keep-all' }}><strong>도메인 주도 설계(DDD)</strong> 기반 패키지 분리</li>
                <li style={{ wordBreak: 'keep-all' }}>끊김 없는 사용자 경험을 위한 <strong>JWT 토큰 자동 갱신</strong></li>
                <li style={{ wordBreak: 'keep-all' }}><strong>이메일 연동</strong>을 통한 계정 보안 및 인증 시스템</li>
                <li style={{ wordBreak: 'keep-all' }}>SSE 기반의 <strong>실시간 채팅 시스템</strong></li>
                <li style={{ wordBreak: 'keep-all' }}>시스템 안정성 및 보안을 위한 <strong>별도의 채점 서버</strong> 운영</li>
              </ul>
           </SlideCard>
        </div>
      </div>
    </SlideLayout>
  );
};

export const Slide09CoreHome = () => {
  return (
    <SlideLayout title="학습의 시작, 홈 대시보드" subtitle="내가 무엇을 해야 할지, 얼마나 성장했는지 한눈에 보여줍니다">
      <div style={{ display: 'flex', gap: '3rem', height: '100%', marginTop: '2rem' }}>
        <div style={{ flex: 1.5 }}>
           <SlideCard title="핵심 UI 컴포넌트" icon={<FaRocket color="var(--slide-primary)" />}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginTop: '1rem' }}>
                 {[
                   { l: '진행률 배너 (Progress)', d: 'Run Cat 애니메이션으로 표현되는 직관적인 학습 성취도' },
                   { l: '미션 이어하기', d: '중단한 지점부터 즉시 학습을 시작할 수 있는 전용 버튼' },
                   { l: '직관적인 미션 카드', d: '난이도 배지와 태그를 통해 문제의 성격을 한눈에 파악' },
                   { l: '상세 검색 및 필터링', d: '난이도와 해결 상태에 따른 맞춤형 미션 선별' }
                 ].map((f, i) => (
                   <div key={i} style={{ padding: '1.5rem', background: '#f8f9fa', borderRadius: '16px', borderLeft: '5px solid var(--slide-primary)', wordBreak: 'keep-all' }}>
                      <div style={{ fontWeight: 800, fontSize: '1.8rem', color: 'var(--slide-primary)' }}>{f.l}</div>
                      <div style={{ fontSize: '1.5rem', color: '#555', marginTop: '0.5rem' }}>{f.d}</div>
                   </div>
                 ))}
              </div>
           </SlideCard>
        </div>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '2rem' }}>
           <div style={{ background: 'rgba(0, 68, 148, 0.05)', padding: '3rem', borderRadius: '32px', textAlign: 'center', border: '2px dashed var(--slide-primary)' }}>
              <div style={{ fontSize: '3rem', fontWeight: 900, color: 'var(--slide-primary)' }}>UX Focus</div>
              <div style={{ fontSize: '1.6rem', color: 'var(--slide-muted)', marginTop: '1rem', wordBreak: 'keep-all' }}>
                &quot;헤매지 않고 바로 시작할 수 있는,<br/>학습자 중심의 직관적인 온보딩을 설계했습니다.&quot;
              </div>
           </div>
           <div style={{ background: 'var(--slide-secondary)', color: '#fff', padding: '3rem', borderRadius: '32px', textAlign: 'center' }}>
              <div style={{ fontSize: '2.5rem', fontWeight: 900 }}>Visual Motivation</div>
              <div style={{ fontSize: '1.6rem', marginTop: '0.5rem', wordBreak: 'keep-all' }}>성취도를 시각화하여 학습의 동기를 지속적으로 부여합니다</div>
           </div>
        </div>
      </div>
    </SlideLayout>
  );
};

export const Slide10CoreIDE = () => {
  return (
    <SlideLayout title="Web IDE 환경" subtitle="번거로운 환경 설정 없이, 오직 코딩에만 몰입할 수 있는 최적화된 환경">
      <div style={{ display: 'flex', gap: '3rem', height: '100%', marginTop: '2rem' }}>
        <div style={{ flex: 1 }}>
           <SlideCard title="Feature Set" icon={<FaCode color="var(--slide-secondary)" />} style={{ height: '100%' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', marginTop: '1.5rem' }}>
                  {[
                    { l: 'Code Editor', d: 'VS Code 엔진 기반 에디팅 및 다양한 언어 지원' },
                    { l: 'Learning Guide', d: '체계적인 미션 가이드와 실시간 자동 저장' },
                    { l: 'Productivity', d: '자유로운 레이아웃과 전용 단축키(Ctrl+Enter) 제공' },
                    { l: 'Execution Feedback', d: '백엔드 채점 결과를 즉시 출력하는 전용 콘솔' }
                  ].map((f, i) => (
                    <div key={i} style={{ borderBottom: '1px solid #eee', paddingBottom: '1.2rem', wordBreak: 'keep-all' }}>
                       <div style={{ fontWeight: 800, fontSize: '1.8rem', color: 'var(--slide-secondary)', marginBottom: '0.3rem' }}>{f.l}</div>
                       <div style={{ fontSize: '1.5rem', color: '#666' }}>{f.d}</div>
                    </div>
                  ))}
              </div>
           </SlideCard>
        </div>
        <div style={{ flex: 2, display: 'flex', flexDirection: 'column', gap: '2rem' }}>
           <div style={{ flex: 1.5, background: '#252526', borderRadius: '20px', padding: '3rem', border: '2px solid var(--slide-primary)', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', marginBottom: '2rem' }}>
                 <FaCode style={{ fontSize: '4rem', color: 'var(--slide-primary)' }} />
                  <div style={{ fontSize: '2.5rem', fontWeight: 800, color: '#fff' }}>어디서나 열리는 나만의 IDE</div>
              </div>
               <div style={{ fontSize: '1.8rem', color: '#aaa', wordBreak: 'keep-all', lineHeight: '1.6' }}>PC 사양이나 설치 과정에 상관없이, 언제 어디서든 마지막 작업 상태 그대로 학습을 이어갈 수 있습니다.</div>
           </div>
           <div style={{ flex: 1, display: 'flex', gap: '2rem' }}>
              <div style={{ flex: 1, background: '#333', borderRadius: '20px', padding: '2rem', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#fff' }}><div style={{ fontSize: '2.2rem', fontWeight: 900 }}>코드 실행</div><div style={{ fontSize: '1.2rem', opacity: 0.7, marginTop: '0.3rem' }}>Execution</div></div>
              <div style={{ flex: 1, background: 'var(--slide-primary)', borderRadius: '20px', padding: '2rem', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#fff' }}><div style={{ fontSize: '2.2rem', fontWeight: 900 }}>최종 제출</div><div style={{ fontSize: '1.2rem', opacity: 0.7, marginTop: '0.3rem' }}>Submission</div></div>
           </div>
        </div>
      </div>
    </SlideLayout>
  );
};

export const Slide11CoreBackend = () => {
  return (
    <SlideLayout title="코드 제출 및 학습 데이터 플로우" subtitle="코드 제출부터 진척도 반영까지의 단계별 데이터 처리 과정">
      <div style={{ display: 'flex', height: '100%', alignItems: 'center', justifyContent: 'center', gap: '1.5rem', padding: '2rem' }}>
        <InfoNode icon={<FaCode />} label="1. 제출 및 검증" desc="사용자 코드 수신 및 API 서버 유효성 검사" style={{ flex: 1, padding: '3rem' }} />
        <Arrow />
        <InfoNode icon={<FaRobot />} label="2. 코드 실행 및 채점" desc="API 서버와 분리된 독립 환경에서 안전하게 채점 수행" color="#0c8599" style={{ flex: 1, padding: '3rem' }} />
        <Arrow />
        <InfoNode icon={<FaDatabase />} label="3. 결과 영속화" desc="채점 결과 및 상세 실행 이력을 DB에 저장" color="#6DB33F" style={{ flex: 1, padding: '3rem' }} />
        <Arrow />
        <InfoNode icon={<FaCheckCircle />} label="4. 성취도 갱신" desc="학습 성공 여부에 따라 사용자의 진행률 업데이트" color="var(--slide-accent)" style={{ flex: 1, padding: '3rem' }} />
      </div>
    </SlideLayout>
  );
};

export const Slide12CoreChat = () => {
  return (
    <SlideLayout title="실시간 채팅 서비스 구현" subtitle="SSE 기술을 활용한 효율적인 메시지 수신 및 접속 상태 관리">
      <div style={{ display: 'flex', gap: '4rem', marginTop: '3rem', alignItems: 'center' }}>
        <div style={{ flex: 1.5, position: 'relative' }}>
           <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
              <div style={{ background: '#fff', padding: '2.5rem', borderRadius: '32px', boxShadow: 'var(--slide-shadow-lg)', border: '2px solid #6f42c1', display: 'flex', alignItems: 'center', gap: '2.5rem' }}>
                 <div style={{ position: 'relative' }}>
                    <FaComments style={{ fontSize: '5rem', color: '#6f42c1' }} />
                    <div style={{ position: 'absolute', top: -5, right: -5, background: 'red', width: '25px', height: '25px', borderRadius: '50%', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1rem', fontWeight: 900 }}>12</div>
                 </div>
                 <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '2.2rem', fontWeight: 900, color: '#6f42c1', marginBottom: '0.5rem' }}>실시간 메시지 수신 (SSE)</div>
                    <div style={{ fontSize: '1.6rem', color: 'var(--slide-muted)' }}>서버 부하를 낮추는 효율적인 실시간 데이터 전송</div>
                 </div>
              </div>
              
              <div style={{ display: 'flex', gap: '2rem' }}>
                 <SlideCard title="연결 상태 유지" icon={<FaSync />} style={{ flex: 1, padding: '2rem' }}>
                    <div style={{ fontSize: '1.5rem' }}>30초 주기 <strong>Heartbeat</strong> 설계</div>
                 </SlideCard>
                 <SlideCard title="접속자 수 확인" icon={<FaUsers />} style={{ flex: 1, padding: '2rem' }}>
                    <div style={{ fontSize: '1.5rem' }}>동시 접속자 <strong>실시간 정보 연동</strong></div>
                 </SlideCard>
              </div>
           </div>
        </div>
        <div style={{ flex: 1 }}>
           <SlideCard title="기술적 세부 사항" icon={<FaShieldAlt color="var(--slide-primary)" />}>
              <ul style={{ fontSize: '1.8rem', lineHeight: '2.2', paddingLeft: '2.5rem' }}>
                <li><strong>효율적인 서버 푸시(SSE)</strong></li>
                <li><strong>브라우저 리소스 최적화</strong></li>
                <li><strong>자동 재연결</strong> 메커니즘</li>
                <li><strong>JWT 기반</strong> 스트림 인증</li>
              </ul>
           </SlideCard>
        </div>
      </div>
    </SlideLayout>
  );
};
