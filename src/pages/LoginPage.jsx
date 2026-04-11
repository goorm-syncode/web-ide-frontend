import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import AuthLayout from '../components/layout/AuthLayout';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import MessageBox from '../components/common/MessageBox';
import Footer from '../components/layout/Footer';
import authService from '../services/auth';
import { loginStart, loginSuccess, loginFailure } from '../store/slices/authSlice';
import { mapErrorMessage } from '../services/errorMapper';
import learncodeImg from '../assets/learncode-icon.png';

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
  const [messageBox, setMessageBox] = useState({
    isOpen: false,
    title: '',
    message: '',
    type: 'info',
    onConfirm: null,
  });
  const [serverError, setServerError] = useState('');
  const [isShaking, setIsShaking] = useState(false);
  const passwordInputRef = useRef(null);

  // 에러 발생 시 자동 포커스 및 전체 선택
  useEffect(() => {
    if (serverError && passwordInputRef.current) {
      passwordInputRef.current.focus();
      if (passwordInputRef.current.select) {
          passwordInputRef.current.select();
      }
    }
  }, [serverError]);

  // Validation Functions
  const validateEmail = (value) => {
    if (!value) return '이메일을 입력해주세요.';
    if (value.includes(' ')) return '공백은 입력할 수 없습니다.';
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) return '올바른 이메일 형식을 입력해주세요.';
    if (value.length < 5 || value.length > 50) return '이메일은 5자 이상 50자 이하로 입력해주세요.';
    return '';
  };

  const validatePassword = (value) => {
    if (!value) return '비밀번호를 입력해주세요.';
    if (value.includes(' ')) return '공백은 입력할 수 없습니다.';
    if (value.length < 8 || value.length > 72)
      return '비밀번호는 8자 이상 72자 이하로 입력해주세요.';
    return '';
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    setErrors((prev) => ({ ...prev, email: validateEmail(value) }));
    if (serverError) setServerError('');
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    setErrors((prev) => ({ ...prev, password: validatePassword(value) }));
    if (serverError) setServerError('');
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);

    if (emailError || passwordError) {
      setErrors({ email: emailError, password: passwordError });
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 500);
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

      navigate('/home'); // 성공 시 홈 페이지로 이동
    } catch (error) {
      const message = mapErrorMessage(error, '이메일 또는 비밀번호가 올바르지 않습니다.');
      setServerError(message);
      dispatch(loginFailure(message));

      // 에러 발생 시 폼 흔들기
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 500);
    } finally {
      setIsLoading(false);
    }
  };

  const closeMessageBox = () => {
    setMessageBox((prev) => ({ ...prev, isOpen: false }));
  };

  // 버튼 비활성화 조건: 로딩 중이거나 값이 비어 있거나 유효하지 않은 에러가 있을 때
  const isSubmitDisabled = isLoading || !email || !password || !!errors.email || !!errors.password;

  return (
    <div
      className="login-page-container"
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100svh',
        overflow: 'hidden',
      }}
    >
      <AuthLayout shake={isShaking}>
        <div className="auth-header">
          <img src={learncodeImg} alt="Learn Code Logo" className="auth-logo-icon" />
          <h1 className="auth-page-title">
            <em>Learn Code</em> 로그인
          </h1>
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
            autoFocus
          />
          <Input
            type="password"
            placeholder="비밀번호를 입력하세요"
            name="password"
            ref={passwordInputRef}
            value={password}
            onChange={handlePasswordChange}
            error={!!errors.password}
            helperText={errors.password}
            disabled={isLoading}
          />

          {serverError && (
            <div className="auth-error-message">
              <span className="auth-error-icon">!</span>
              {serverError}
            </div>
          )}

          <div className="auth-submit-btn-wrapper">
            <Button primary fullWidth type="submit" loading={isLoading} disabled={isSubmitDisabled}>
              로그인
            </Button>
          </div>
        </form>

        <div className="auth-links">
          <Link to="/signup" className="auth-link-text">
            회원가입
          </Link>
          <Link to="/forgot-password" className="auth-link-text">
            비밀번호 찾기
          </Link>
        </div>

        <MessageBox
          isOpen={messageBox.isOpen}
          onClose={closeMessageBox}
          title={messageBox.title}
          type={messageBox.type}
          onConfirm={messageBox.onConfirm || closeMessageBox}
        >
          {messageBox.message}
        </MessageBox>
      </AuthLayout>

      <Footer />
    </div>
  );
};

export default LoginPage;

