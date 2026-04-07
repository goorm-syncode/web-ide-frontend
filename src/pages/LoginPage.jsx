import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import AuthLayout from '../components/layout/AuthLayout';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import MessageBox from '../components/common/MessageBox';
import authService from '../services/auth';
import { loginStart, loginSuccess, loginFailure } from '../store/slices/authSlice';

const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [errors, setErrors] = useState({
    email: '',
    password: '',
  });

  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState('');

  // Validation Functions
  const validateEmail = (value) => {
    if (!value) return '이메일을 입력해주세요.';
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) return '올바른 이메일 형식을 입력해주세요.';
    return '';
  };

  const validatePassword = (value) => {
    if (!value) return '비밀번호를 입력해주세요.';
    if (value.length < 8) return '비밀번호는 최소 8자 이상이어야 합니다.';
    return '';
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    setErrors((prev) => ({ ...prev, email: validateEmail(value) }));
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    setErrors((prev) => ({ ...prev, password: validatePassword(value) }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);

    if (emailError || passwordError) {
      setErrors({ email: emailError, password: passwordError });
      return;
    }

    try {
      setIsLoading(true);
      setServerError('');
      dispatch(loginStart());

      const response = await authService.login(email, password);
      const { accessToken, refreshToken } = response;

      // 토큰을 localStorage에 저장 (api.js 인터셉터에서 사용됨)
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);

      // 내 정보(프로필) 상세 조회
      const userData = await authService.getMe();

      dispatch(
        loginSuccess({
          accessToken,
          user: userData,
        }),
      );

      navigate('/dev/home'); // 성공 시 개발 홈 페이지로 이동
    } catch (error) {
      const message = error.message || '이메일 또는 비밀번호가 올바르지 않습니다.';
      setServerError(message);
      dispatch(loginFailure(message));
    } finally {
      setIsLoading(false);
    }
  };

  // 버튼 비활성화 조건: 로딩 중이거나 값이 비어 있거나 유효하지 않은 에러가 있을 때
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
          <Button primary fullWidth type="submit" loading={isLoading} disabled={isSubmitDisabled}>
            로그인
          </Button>
        </div>
      </form>

      <div className="auth-links">
        <Link to="/dev/signup" className="auth-link-text">
          회원가입
        </Link>
        <Link to="/dev/reset-password" className="auth-link-text">
          비밀번호 찾기
        </Link>
      </div>

      <MessageBox
        isOpen={!!serverError}
        onClose={() => setServerError('')}
        title="로그인 실패"
        type="error"
        onConfirm={() => setServerError('')}
      >
        {serverError}
      </MessageBox>
    </AuthLayout>
  );
};

export default LoginPage;
