import React from 'react';
import MainLayout from '../../components/layout/MainLayout';
import Button from '../../components/common/Button';

const GNBTestPage = () => {
  return (
    <MainLayout>
      <div style={{ padding: '0 24px', maxWidth: '1126px', margin: '0 auto' }}>
        <section style={{ padding: '80px 0', textAlign: 'center' }}>
          <h1 style={{ fontSize: '3.5rem', marginBottom: '24px' }}>GNB Component Test</h1>
          <p style={{ fontSize: '1.2rem', color: 'var(--text)', maxWidth: '600px', margin: '0 auto 40px' }}>
            이 페이지는 GNB 컴포넌트의 디자인과 기능을 실시간으로 확인하기 위한 개발용 테스트 페이지입니다.
          </p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
            <Button type="primary">Primary Action</Button>
            <Button type="secondary">Secondary Action</Button>
          </div>
        </section>

        {/* Scroll Content to Test Sticky/Blur */}
        <div style={{ display: 'grid', gap: '40px', padding: '40px 0' }}>
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <div key={i} style={{ 
              padding: '60px', 
              background: 'var(--accent-bg)', 
              borderRadius: '16px',
              border: '1px solid var(--accent-border)',
              textAlign: 'left'
            }}>
              <h2 style={{ color: 'var(--accent)', marginBottom: '16px' }}>Section {i}</h2>
              <p style={{ lineHeight: '1.6' }}>
                GNB의 `backdrop-filter: blur` 효과를 확인하기 위한 스크롤용 콘텐츠입니다. 
                이 텍스트가 GNB 뒤로 지나갈 때 부드럽게 흐려지는지 확인해 주세요. 
                Vite와 React를 사용한 고성능 웹 IDE 프론트엔드 환경에서 최적의 네비게이션 경험을 제공합니다.
              </p>
            </div>
          ))}
        </div>

        <section style={{ padding: '100px 0', textAlign: 'center', borderTop: '1px solid var(--border)' }}>
          <p style={{ color: 'var(--text)' }}>© 2026 Web IDE Frontend. All rights reserved.</p>
        </section>
      </div>
    </MainLayout>
  );
};

export default GNBTestPage;
