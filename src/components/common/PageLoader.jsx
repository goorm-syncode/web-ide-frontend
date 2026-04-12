import React from 'react';

const PageLoader = () => (
  <div style={{ 
    display: 'flex', 
    flexDirection: 'column',
    justifyContent: 'center', 
    alignItems: 'center', 
    height: '100vh',
    width: '100vw',
    backgroundColor: 'var(--bg-page)',
    fontSize: '1.1rem',
    color: 'var(--text-muted)',
    fontWeight: '600',
    fontFamily: 'Pretendard, sans-serif'
  }}>
    <div style={{ marginBottom: '1rem' }}>
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ animation: 'spin 1s linear infinite' }}>
        <path d="M21 12a9 9 0 1 1-6.219-8.56" />
      </svg>
    </div>
    <style>{`
      @keyframes spin {
        to { transform: rotate(360deg); }
      }
    `}</style>
    <span>Loading...</span>
  </div>
);

export default PageLoader;
