import { useState } from 'react';
import { Link } from 'react-router-dom';
import AuthLayout from '../components/layout/AuthLayout';
import Input from '../components/common/Input';
import Button from '../components/common/Button';

const ResetPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const isEmailValid = email.length >= 5 && email.length <= 50 && email.includes('@') && !email.includes(' ');

  const handleReset = () => {
    if (!isEmailValid) return;
    setSubmitted(true);
  };

  return (
    <div style={{ position: 'relative' }}>
      <div style={{ position: 'absolute', top: '24px', left: '24px' }}>
        <Link to="/" style={{ textDecoration: 'none', color: '#6366F1', fontWeight: 600 }}>← 메인으로 돌아가기</Link>
      </div>
      <AuthLayout title="비밀번호 재설정">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {submitted ? (
            <div style={{ textAlign: 'center', color: '#4B5563', fontSize: '14px', lineHeight: '1.5' }}>
              입력하신 이메일로 비밀번호 재설정 링크가 전송되었습니다.<br/>
              이메일을 확인해주세요.
            </div>
          ) : (
            <>
              <div style={{ color: '#4B5563', fontSize: '14px', marginBottom: '8px' }}>
                가입하신 이메일을 입력하시면 비밀번호<br/>재설정 링크를 보내드립니다.
              </div>
              <Input 
                placeholder="이메일 입력" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={email.length > 0 && !isEmailValid}
              />
              <Button 
                type="primary" 
                onClick={handleReset}
                disabled={!isEmailValid}
                style={{ width: '100%', marginTop: '8px' }}
              >
                재설정 링크 보내기
              </Button>
            </>
          )}
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '24px', fontSize: '14px', color: '#4B5563' }}>
          기억나셨나요? &nbsp;
          <Link to="/login" style={{ color: '#6366F1', textDecoration: 'none', fontWeight: 'bold' }}>로그인으로 돌아가기</Link>
        </div>
      </AuthLayout>
    </div>
  );
};

export default ResetPasswordPage;
