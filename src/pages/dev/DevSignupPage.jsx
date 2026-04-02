import React from 'react';
import SignupPage from '../SignupPage';

const DevSignupPage = () => {
    return (
        <div style={{ padding: '24px', backgroundColor: '#f9fafb', minHeight: '100vh' }}>
            <div style={{ marginBottom: '24px', paddingBottom: '12px', borderBottom: '1px solid #e5e7eb' }}>
                <h2 style={{ margin: 0, color: '#111827' }}>Dev Sandbox: Signup Page</h2>
                <p style={{ margin: '8px 0 0 0', color: '#6b7280', fontSize: '14px' }}>
                    개발용 테스트 페이지입니다. 아래 영역에 실제 SignupPage 컴포넌트가 렌더링됩니다.
                </p>
            </div>
            <div style={{ backgroundColor: 'white', padding: '24px', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
                <SignupPage />
            </div>
        </div>
    );
};

export default DevSignupPage;
