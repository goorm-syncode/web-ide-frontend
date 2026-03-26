import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthLayout from '../components/layout/AuthLayout';
import Input from '../components/common/Input';
import Button from '../components/common/Button';

const SignupPage = () => {
  const [email, setEmail] = useState('');
  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  // Validate Email
  const isEmailValid = email.length >= 5 && email.length <= 50 && email.includes('@') && !email.includes(' ');
  
  // Validate Nickname
  const nicknameRegex = /^[가-힣a-zA-Z0-9]+$/;
  const isNicknameValid = nickname.length >= 2 && nickname.length <= 12 && nicknameRegex.test(nickname) && !nickname.includes(' ');

  // Validate Password
  const hasEn = /[a-zA-Z]/.test(password);
  const hasNum = /[0-9]/.test(password);
  const hasSpecial = /[^a-zA-Z0-9\s]/.test(password);
  const isPasswordValid = password.length >= 8 && password.length <= 20 && hasEn && hasNum && hasSpecial && !password.includes(' ');

  const isValid = isEmailValid && isNicknameValid && isPasswordValid;

  const handleSignup = () => {
    if (!isValid) return;
    alert('회원가입 성공 처리 (추후 API 연동)');
    navigate('/login');
  };

  return (
    <div style={{ position: 'relative' }}>
      <div style={{ position: 'absolute', top: '24px', left: '24px' }}>
        <Link to="/" style={{ textDecoration: 'none', color: '#6366F1', fontWeight: 600 }}>← 메인으로 돌아가기</Link>
      </div>
      <AuthLayout title="회원가입">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <Input 
            placeholder="이메일 (@ 포함 5~50자)" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={email.length > 0 && !isEmailValid}
            helperText={email.length > 0 && !isEmailValid ? "유효한 이메일 형식이 아닙니다." : ""}
          />
          <Input 
            placeholder="닉네임 (한글/영문/숫자 2~12자)" 
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            error={nickname.length > 0 && !isNicknameValid}
            helperText={nickname.length > 0 && !isNicknameValid ? "특수문자/공백 조심해 2~12자로 입력해 주세요." : ""}
          />
          <Input 
            type="password"
            placeholder="비밀번호 (영문/숫자/특수문자 포함 8~20자)" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={password.length > 0 && !isPasswordValid}
            helperText={password.length > 0 && !isPasswordValid ? "영문, 숫자, 특수문자를 모두 포함해야 합니다." : ""}
          />
          
          <Button 
            type="primary" 
            onClick={handleSignup}
            disabled={!isValid}
            style={{ width: '100%', marginTop: '8px' }}
          >
            가입하기
          </Button>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '24px', fontSize: '14px', color: '#4B5563' }}>
          이미 계정이 있으신가요? &nbsp;
          <Link to="/login" style={{ color: '#6366F1', textDecoration: 'none', fontWeight: 'bold' }}>로그인</Link>
        </div>
      </AuthLayout>
    </div>
  );
};

export default SignupPage;
