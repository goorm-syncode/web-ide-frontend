import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthLayout from '../components/layout/AuthLayout';
import Input from '../components/common/Input';
import Button from '../components/common/Button';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const isEmailValid = email.length >= 5 && email.length <= 50 && email.includes('@') && !email.includes(' ');
  const isPasswordValid = password.length >= 8 && password.length <= 20 && !password.includes(' ');

  const isValid = isEmailValid && isPasswordValid;

  const handleLogin = () => {
    if (!isValid) return;
    alert('로그인 성공 처리 (추후 API 연동)');
    navigate('/');
  };

  return (
    <div style={{ position: 'relative' }}>
      <div style={{ position: 'absolute', top: '24px', left: '24px' }}>
        <Link to="/" style={{ textDecoration: 'none', color: '#6366F1', fontWeight: 600 }}>← 메인으로 돌아가기</Link>
      </div>
      <AuthLayout title="로그인">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <Input 
            placeholder="이메일 입력" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input 
            type="password"
            placeholder="비밀번호 입력" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          
          <Button 
            type="primary" 
            onClick={handleLogin}
            disabled={!isValid || email.length === 0 || password.length === 0}
            style={{ width: '100%', marginTop: '8px' }}
          >
            로그인
          </Button>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '24px', gap: '12px', fontSize: '14px', color: '#4B5563' }}>
          <Link to="/reset-password" style={{ color: '#4B5563', textDecoration: 'none' }}>비밀번호 재설정</Link>
          <span>|</span>
          <Link to="/signup" style={{ color: '#6366F1', textDecoration: 'none', fontWeight: 'bold' }}>회원가입</Link>
        </div>
      </AuthLayout>
    </div>
  );
};

export default LoginPage;
