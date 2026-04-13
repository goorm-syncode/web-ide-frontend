import React from 'react';
import { SlideLayout, SlideCard, Arrow, InfoNode, MetricCard } from '../components/SlideBase';
import { FaDatabase, FaGlobe, FaDesktop, FaCode, FaRobot, FaSync, FaCheckCircle, FaRocket, FaCloud, FaShieldAlt, FaComments, FaUsers, FaArrowRight, FaStream, FaServer } from 'react-icons/fa';
import { SiGithubactions, SiGithub, SiDocker } from 'react-icons/si';

/* eslint-disable react/prop-types */

const BrandBox = ({ icon, label, sub, color, style }) => (
  <div style={{ 
    display: 'flex', flexDirection: 'column', alignItems: 'center', 
    background: '#fff', padding: '2rem', borderRadius: '24px', 
    boxShadow: '0 10px 30px rgba(0,0,0,0.05)', border: `1px solid #eee`, 
    width: '160px', transition: 'all 0.3s ease',
    ...style 
  }}>
    <div style={{ fontSize: '4.5rem', color: color, marginBottom: '1.5rem' }}>{icon}</div>
    <div style={{ fontWeight: 900, fontSize: '1.5rem', color: '#333', textAlign: 'center' }}>{label}</div>
    <div style={{ fontSize: '1.1rem', color: '#888', marginTop: '0.4rem', textAlign: 'center' }}>{sub}</div>
  </div>
);

const FlowArrow = () => (
  <div style={{ display: 'flex', alignItems: 'center', color: '#ccc', fontSize: '2rem' }}>
    <FaArrowRight />
  </div>
);

export const Slide07Architecture = () => {
  return (
    <SlideLayout title="전체 시스템 아키텍처" subtitle="Brand-Driven Infrastructure & DevOps Pipeline">
      <div style={{ display: 'flex', flexDirection: 'column', gap: '4rem', marginTop: '1rem' }}>
        
        {/* Row 1: CI/CD Pipeline Flow */}
        <div style={{ background: '#fcfcfc', padding: '2.5rem', borderRadius: '32px', border: '1px solid #eee', position: 'relative' }}>
           <div style={{ position: 'absolute', top: '-1.5rem', left: '3rem', background: '#333', color: '#fff', padding: '0.5rem 2rem', borderRadius: '10px', fontSize: '1.2rem', fontWeight: 900 }}>CI/CD Pipeline</div>
           <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '3rem' }}>
              <BrandBox icon={<SiGithub />} label="GitHub" sub="Source Control" color="#181717" />
              <FlowArrow />
              <BrandBox icon={<SiGithubactions />} label="Actions" sub="CI/CD Engine" color="#2088FF" />
              <FlowArrow />
              <BrandBox icon={<SiDocker />} label="Docker" sub="Containerizing" color="#2496ED" />
              <FlowArrow />
              <BrandBox icon={<FaCloud />} label="AWS ECR" sub="Image Registry" color="#FF9900" />
           </div>
        </div>

        {/* Row 2: Service Runtime Delivery Flow */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '3rem', alignItems: 'center', flexWrap: 'nowrap' }}>
           
           {/* Client */}
           <div style={{ textAlign: 'center', minWidth: '100px' }}>
              <div style={{ fontSize: '5rem', color: 'var(--slide-primary)', marginBottom: '1rem' }}><FaDesktop /></div>
              <div style={{ fontWeight: 900, fontSize: '1.4rem' }}>User Agent</div>
           </div>

           <FlowArrow />

           {/* CDN & Gateway Layer */}
           <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', minWidth: '180px' }}>
              <div style={{ background: '#FF9900', color: '#fff', padding: '1.5rem 2rem', borderRadius: '20px', textAlign: 'center', fontWeight: 900, lineHeight: '1.4', boxShadow: 'var(--slide-shadow)' }}>
                 <FaCloud style={{ display: 'block', margin: '0 auto 0.5rem', fontSize: '3rem' }} /> 
                 CloudFront<br/>(Edge Service)
              </div>
           </div>

           <FlowArrow />

           {/* Compute & Processing Zone */}
           <div style={{ position: 'relative', display: 'flex', gap: '1.5rem', alignItems: 'center', padding: '1.5rem', background: 'rgba(0,0,0,0.02)', borderRadius: '32px', border: '2px dashed #eee' }}>
              <div style={{ position: 'absolute', top: '-1.5rem', left: '2rem', background: '#FF9900', color: '#fff', padding: '0.3rem 1.5rem', borderRadius: '8px', fontSize: '1.1rem', fontWeight: 800 }}>Compute Zone</div>
              <BrandBox icon={<FaGlobe />} label="S3" sub="FE Hosting" color="#569A31" style={{ width: '130px', padding: '1.5rem' }} />
              <BrandBox icon={<FaServer />} label="EC2" sub="Spring Boot" color="#FF9900" style={{ width: '130px', padding: '1.5rem', border: '3px solid #FF9900' }} />
              
              {/* SSE as a Side Channel */}
              <div style={{ background: '#fff', padding: '1.2rem', borderRadius: '20px', border: '2px solid #6f42c1', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', boxShadow: 'var(--slide-shadow)' }}>
                 <FaStream color="#6f42c1" style={{ fontSize: '2.5rem' }} />
                 <div style={{ fontWeight: 900, color: '#6f42c1', fontSize: '1.2rem' }}>SSE Hub</div>
                 <div style={{ fontSize: '0.9rem', color: '#6f42c1', opacity: 0.8 }}>Real-time</div>
              </div>
           </div>

           <FlowArrow />

           {/* Persistence Layer */}
           <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', minWidth: '130px' }}>
              <BrandBox icon={<FaDatabase />} label="RDS" sub="MySQL 8.0" color="#527FFF" style={{ width: '130px', padding: '1.5rem' }} />
           </div>

        </div>

        <div style={{ textAlign: 'center', color: '#bbb', fontSize: '1.3rem', fontWeight: 600 }}>
          AWS 환경 기반의 클라우드 아키텍처 구축
        </div>
      </div>
    </SlideLayout>
  );
};

export const Slide08BackendArch = () => {
  return (
    <SlideLayout title="백엔드 도메인 아키텍처" subtitle="레이어 아키텍처 기반의 직관적인 데이터 처리 흐름">
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
                <li><strong>도메인 주도 설계(DDD)</strong> 기반 패키지 분리</li>
                <li>JWT <strong>Refresh Token Rotation</strong> 구현</li>
                <li><strong>SMTP 기반 이메일 전송 시스템</strong>
                   <div style={{ fontSize: '1.4rem', color: '#888', marginLeft: '1rem' }}>- 계정 보안 및 비밀번호 찾기 서비스 지원</div>
                </li>
                <li>SSE 연결을 통한 <strong>실시간 방송</strong> 시스템</li>
                <li>격리된 가상 환경에서의 <strong>코드 채점 연동</strong></li>
              </ul>
           </SlideCard>
        </div>
      </div>
    </SlideLayout>
  );
};

export const Slide09CoreHome = () => {
  return (
    <SlideLayout title="미션 탐색 및 학습 관리" subtitle="효율적인 문제 찾기와 체계적인 진행 상태 동기화">
      <div style={{ display: 'flex', gap: '3rem', height: '100%', marginTop: '2rem' }}>
        <div style={{ flex: 1.5 }}>
           <SlideCard title="Mission Discovery Features" icon={<FaRocket color="var(--slide-primary)" />}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginTop: '1rem' }}>
                 {[
                   { l: '다각도 필터링', d: '주제별, 난이도별 체계적인 분류' },
                   { l: '실시간 검색', d: '제목 및 태그 기반 통합 검색 시스템' },
                   { l: '스마트 점프', d: '학습 편의를 위한 미완료 미션 자동 추적' },
                   { l: '학습 현황 관리', d: '전체 진행률 및 단계별 상태 시각화' }
                 ].map((f, i) => (
                   <div key={i} style={{ padding: '1.5rem', background: '#f8f9fa', borderRadius: '16px', borderLeft: '5px solid var(--slide-primary)' }}>
                      <div style={{ fontWeight: 800, fontSize: '1.8rem' }}>{f.l}</div>
                      <div style={{ fontSize: '1.4rem', color: '#888' }}>{f.d}</div>
                   </div>
                 ))}
              </div>
           </SlideCard>
        </div>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '3rem' }}>
           <MetricCard value="Instant" label="Fast Search Response" />
           <div style={{ background: 'var(--slide-secondary)', color: '#fff', padding: '3rem', borderRadius: '32px', textAlign: 'center' }}>
              <div style={{ fontSize: '4rem', fontWeight: 900 }}>Persistence</div>
              <div style={{ fontSize: '1.8rem' }}>Reliable State Management</div>
           </div>
        </div>
      </div>
    </SlideLayout>
  );
};

export const Slide10CoreIDE = () => {
  return (
    <SlideLayout title="Web IDE 환경" subtitle="실제 로컬 개발 환경과 유사한 몰입형 경험 제공">
      <div style={{ display: 'flex', gap: '3rem', height: '100%', marginTop: '2rem' }}>
        <div style={{ flex: 1 }}>
           <SlideCard title="Feature Set" icon={<FaCode color="var(--slide-secondary)" />} style={{ height: '100%' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', marginTop: '1.5rem' }}>
                 {[
                   { l: 'Monaco Editor', d: 'VS Code 엔진 기반의 에디팅' },
                   { l: 'Multi-theme', d: '사용자 설정 기반 테마 전환' },
                   { l: 'Multi-language', d: 'Java, Python, JS 등 다국어 환경 지원' },
                   { l: 'Auto Save', d: '작성 중인 코드 자동 보존' }
                 ].map((f, i) => (
                   <div key={i} style={{ borderBottom: '1px solid #eee', paddingBottom: '1rem' }}>
                      <div style={{ fontWeight: 800, fontSize: '1.8rem' }}>{f.l}</div>
                      <div style={{ fontSize: '1.4rem', color: 'var(--slide-muted)' }}>{f.d}</div>
                   </div>
                 ))}
              </div>
           </SlideCard>
        </div>
        <div style={{ flex: 2, display: 'flex', flexDirection: 'column', gap: '2rem' }}>
           <div style={{ flex: 1.5, background: '#252526', borderRadius: '20px', padding: '3rem', border: '2px solid var(--slide-primary)', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', marginBottom: '2rem' }}>
                 <FaCode style={{ fontSize: '4rem', color: 'var(--slide-primary)' }} />
                 <div style={{ fontSize: '2.2rem', fontWeight: 800, color: '#fff' }}>Monaco Editor Interface</div>
              </div>
              <div style={{ fontSize: '1.8rem', color: '#888' }}>자동 완성, 단축키 지원, 실시간 저장</div>
           </div>
           <div style={{ flex: 1, display: 'flex', gap: '2rem' }}>
              <div style={{ flex: 1, background: '#333', borderRadius: '20px', padding: '2rem', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem', fontWeight: 800, color: '#fff' }}>EXECUTION</div>
              <div style={{ flex: 1, background: 'var(--slide-primary)', borderRadius: '20px', padding: '2rem', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem', fontWeight: 800, color: '#fff' }}>SUBMISSION</div>
           </div>
        </div>
      </div>
    </SlideLayout>
  );
};

export const Slide11CoreBackend = () => {
  return (
    <SlideLayout title="코드 채점과 학습 상태 관리" subtitle="보이지 않는 곳에서의 정밀한 학습 진척 관리">
      <div style={{ display: 'flex', height: '100%', alignItems: 'center', justifyContent: 'center', gap: '1.5rem', padding: '2rem' }}>
        <InfoNode icon={<FaCode />} label="코드 제출" desc="Draft 자동 저장 & 검증" style={{ flex: 1, padding: '3rem' }} />
        <Arrow />
        <InfoNode icon={<FaRobot />} label="코드 채점" desc="격리된 가상 환경에서의 컴파일 및 실행" color="#0c8599" style={{ flex: 1, padding: '3rem' }} />
        <Arrow />
        <InfoNode icon={<FaDatabase />} label="기록 및 결과" desc="Submission History 저장" color="#6DB33F" style={{ flex: 1, padding: '3rem' }} />
        <Arrow />
        <InfoNode icon={<FaCheckCircle />} label="상태 업데이트" desc="달성률(Progress) 업서트" color="var(--slide-accent)" style={{ flex: 1, padding: '3rem' }} />
      </div>
    </SlideLayout>
  );
};

export const Slide12CoreChat = () => {
  return (
    <SlideLayout title="실시간 소통과 연결" subtitle="고립된 학습이 아닌 '함께' 하는 경험 제공">
      <div style={{ display: 'flex', gap: '4rem', marginTop: '3rem', alignItems: 'center' }}>
        <div style={{ flex: 1.5, position: 'relative' }}>
           <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
              <div style={{ background: '#fff', padding: '2.5rem', borderRadius: '32px', boxShadow: 'var(--slide-shadow-lg)', border: '2px solid #6f42c1', display: 'flex', alignItems: 'center', gap: '2.5rem' }}>
                 <div style={{ position: 'relative' }}>
                    <FaComments style={{ fontSize: '5rem', color: '#6f42c1' }} />
                    <div style={{ position: 'absolute', top: -5, right: -5, background: 'red', width: '25px', height: '25px', borderRadius: '50%', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1rem', fontWeight: 900 }}>12</div>
                 </div>
                 <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '2.2rem', fontWeight: 900, color: '#6f42c1', marginBottom: '0.5rem' }}>SSE Real-time Broadcast</div>
                    <div style={{ fontSize: '1.6rem', color: 'var(--slide-muted)' }}>브라우저의 리소스 소모를 최소화한 단방향 스트리밍</div>
                 </div>
              </div>
              
              <div style={{ display: 'flex', gap: '2rem' }}>
                 <SlideCard title="Heartbeat" icon={<FaSync />} style={{ flex: 1, padding: '2rem' }}>
                    <div style={{ fontSize: '1.5rem' }}>30초 주기 <strong>연결 유지</strong> 설계</div>
                 </SlideCard>
                 <SlideCard title="Online Count" icon={<FaUsers />} style={{ flex: 1, padding: '2rem' }}>
                    <div style={{ fontSize: '1.5rem' }}>동시 접속자 <strong>실시간 연동</strong></div>
                 </SlideCard>
              </div>
           </div>
        </div>
        <div style={{ flex: 1 }}>
           <SlideCard title="Technical Detail" icon={<FaShieldAlt color="var(--slide-primary)" />}>
              <ul style={{ fontSize: '1.8rem', lineHeight: '2.2', paddingLeft: '2.5rem' }}>
                <li><strong>Stateless</strong> Token Auth</li>
                <li><strong>Memory-efficient</strong> Stream</li>
                <li><strong>Automatic</strong> Reconnection</li>
                <li>Direct <strong>MIME-type</strong> Control</li>
              </ul>
           </SlideCard>
        </div>
      </div>
    </SlideLayout>
  );
};
