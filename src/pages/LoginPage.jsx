import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AuthLayout from '../components/layout/AuthLayout';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import MessageBox from '../components/common/MessageBox';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const [errors, setErrors] = useState({
    email: '',
    password: ''
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState('');
  
  // Validation Functions
  const validateEmail = (value) => {
    if (!value) return '이메일을 입력해주세요.';
    if (value.includes(' ')) return '공백은 입력할 수 없습니다.';
    if (value.length < 5 || value.length > 50) return '이메일은 5자 이상 50자 이하로 입력해주세요.';
    // Basic email regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) return '올바른 이메일 형식을 입력해주세요.';
    return '';
  };

  const validatePassword = (value) => {
    if (!value) return '비밀번호를 입력해주세요.';
    if (value.includes(' ')) return '공백은 입력할 수 없습니다.';
    if (value.length < 8 || value.length > 20) return '비밀번호는 8자 이상 20자 이하로 입력해주세요.';
    return '';
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    setErrors(prev => ({ ...prev, email: validateEmail(value) }));
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    setErrors(prev => ({ ...prev, password: validatePassword(value) }));
  };

  const handleLogin = (e) => {
    e.preventDefault();
    
    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);
    
    if (emailError || passwordError) {
      setErrors({ email: emailError, password: passwordError });
      return;
    }
    
    setIsLoading(true);
    
    // 모의 로그인 처리 (추후 src/services/authService 연동으로 교체)
    setTimeout(() => {
      setIsLoading(false);
      // 데모를 위한 임시 에러 발생 로직
      if (email === 'error@test.com') {
        setServerError('로그인 처리 중 문제가 발생했습니다.');
      } else if (password === 'wrongpassword') {
        setErrors(prev => ({ ...prev, password: '이메일 또는 비밀번호가 올바르지 않습니다.' }));
      } else {
        // 성공 처리 로직. 현 단계에서는 데모 Alert
        alert('로그인 성공!');
      }
    }, 1000);
  };

  // 버튼 비활성화 조건: 두 필드 모두 에러가 없어야 하며, 값이 하나라도 입력되어 있어야 함. 
  // 그러나 초기 상태에서는 에러가 없으나 값이 비어 있으므로 `!email || !password` 조건 추가
  const isSubmitDisabled = isLoading || !email || !password || !!errors.email || !!errors.password;

  return (
    <AuthLayout>
      <div className="auth-header">
        <h1 className="auth-page-title">로그인</h1>
        <p className="auth-page-subtitle">서비스에 로그인하여 모든 기능을 이용하세요.</p>
      </div>
      
      <form onSubmit={handleLogin} className="auth-form" noValidate>
        <Input 
          type="email" 
          placeholder="이메일을 입력하세요" 
          name="email"
          value={email}
          onChange={handleEmailChange}
          error={!!errors.email}
          helperText={errors.email}
          disabled={isLoading}
        />
        <Input 
          type="password" 
          placeholder="비밀번호를 입력하세요" 
          name="password"
          value={password}
          onChange={handlePasswordChange}
          error={!!errors.password}
          helperText={errors.password}
          disabled={isLoading}
        />
        
        <div className="auth-submit-btn-wrapper">
          <Button 
            type="submit" 
            variant="primary" 
            fullWidth 
            loading={isLoading} 
            disabled={isSubmitDisabled}
          >
            로그인
          </Button>
        </div>
      </form>
      
      <div className="auth-links">
        <Link to="/dev/signup" className="auth-link-text">회원가입</Link>
        <Link to="/dev/reset-password" className="auth-link-text">비밀번호 찾기</Link>
      </div>

      <MessageBox 
        isOpen={!!serverError} 
        onClose={() => setServerError('')} 
        title="로그인 실패" 
        type="error"
      >
        {serverError}
      </MessageBox>
    </AuthLayout>
  );
};

export default LoginPage;
