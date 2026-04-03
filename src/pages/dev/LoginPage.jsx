import React from 'react';
import LoginPage from '../LoginPage';

const DevLoginPage = () => {
  return (
    <div style={{ padding: '24px', backgroundColor: '#f9fafb', minHeight: '100vh' }}>
      <div style={{ marginBottom: '24px', paddingBottom: '12px', borderBottom: '1px solid #e5e7eb' }}>
        <h2 style={{ margin: 0, color: '#111827' }}>Dev Sandbox: Login Page</h2>
        <p style={{ margin: '8px 0 0 0', color: '#6b7280', fontSize: '14px' }}>
          개발용 테스트 페이지입니다. 아래 영역에 실제 LoginPage 컴포넌트가 렌더링됩니다.
        </p>
      </div>
      <div style={{ backgroundColor: '#fff', minHeight: '500px', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
        <LoginPage />
      </div>
    </div>
  );
};

export default DevLoginPage;
