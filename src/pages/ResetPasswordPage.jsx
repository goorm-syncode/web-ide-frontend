import React, { useState } from 'react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import AuthLayout from '../components/layout/AuthLayout';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import MessageBox from '../components/common/MessageBox';
import Footer from '../components/layout/Footer';

import authService from '../services/auth';
import { mapErrorMessage } from '../services/errorMapper';
import learncodeIcon from '../assets/logo-auth.png';

const ResetPasswordPage = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const navigate = useNavigate();

  // Mode: request-link OR reset-password
  const isResetMode = !!token;

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  const [errors, setErrors] = useState({
    email: '',
    password: '',
    passwordConfirm: '',
  });

  const [loading, setLoading] = useState(false);
  const [messageBox, setMessageBox] = useState({
    onConfirm: null,
  });

  const [serverError, setServerError] = useState('');

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

    const missing = [];
    if (!/[a-z]/.test(value)) missing.push('소문자');
    if (!/[A-Z]/.test(value)) missing.push('대문자');
    if (!/\d/.test(value)) missing.push('숫자');
    if (!/[^a-zA-Z0-9]/.test(value)) missing.push('특수문자');

    if (missing.length > 0) {
      return `다음 항목이 누락되었습니다: ${missing.join(', ')}`;
    }
    return '';
  };

  const validatePasswordConfirm = (pwd, confirmPwd) => {
    if (!confirmPwd) return '비밀번호 확인을 입력해주세요.';
    if (pwd !== confirmPwd) return '비밀번호가 일치하지 않습니다.';
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
    setErrors((prev) => ({
      ...prev,
      password: validatePassword(value),
      passwordConfirm: validatePasswordConfirm(value, passwordConfirm),
    }));
    if (serverError) setServerError('');
  };

  const handlePasswordConfirmChange = (e) => {
    const value = e.target.value;
    setPasswordConfirm(value);
    setErrors((prev) => ({
      ...prev,
      passwordConfirm: validatePasswordConfirm(password, value),
    }));
    if (serverError) setServerError('');
  };

  const handleRequestSubmit = async (e) => {
    e.preventDefault();
    const emailError = validateEmail(email);
    if (emailError) {
      setErrors((prev) => ({ ...prev, email: emailError }));
      return;
    }

    setLoading(true);
    try {
      await authService.requestPasswordReset(email);
      setMessageBox({
        isOpen: true,
        type: 'success',
        title: '요청 완료',
        message: '비밀번호 재설정 링크가 이메일로 발송되었습니다.',
        onConfirm: closeMessageBox,
      });
    } catch (err) {
      const message = mapErrorMessage(err, '비밀번호 재설정 요청 중 문제가 발생했습니다.');
      setServerError(message);
    } finally {
      setLoading(false);
    }
  };

  const handleResetSubmit = async (e) => {
    e.preventDefault();
    const pwdError = validatePassword(password);
    const pwdConfirmError = validatePasswordConfirm(password, passwordConfirm);

    if (pwdError || pwdConfirmError) {
      setErrors((prev) => ({ ...prev, password: pwdError, passwordConfirm: pwdConfirmError }));
      return;
    }

    setLoading(true);
    try {
      await authService.confirmPasswordReset(token, password);
      // Success keeps MessageBox
      setMessageBox({
        isOpen: true,
        type: 'success',
        title: '재설정 완료',
        message: '비밀번호가 성공적으로 변경되었습니다. 다시 로그인해주세요.',
        onConfirm: () => {
          closeMessageBox();
          navigate('/login');
        },
      });
    } catch (err) {
      const message = mapErrorMessage(err, '비밀번호 변경 중 문제가 발생했습니다. 링크가 만료되었을 수 있습니다.');
      setServerError(message);
    } finally {
      setLoading(false);
    }
  };

  const closeMessageBox = () => {
    setMessageBox((prev) => ({ ...prev, isOpen: false }));
  };

  const isRequestDisabled = loading || !email || !!errors.email;
  const isResetDisabled =
    loading || !password || !passwordConfirm || !!errors.password || !!errors.passwordConfirm;

  return (
    <div
      className="reset-password-container"
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100svh',
        overflow: 'hidden',
      }}
    >
      <AuthLayout>
        <div className="auth-header">
          <img src={learncodeIcon} alt="Learn Code" className="auth-logo-icon" />
          <h1 className="auth-page-title">
            <em>Learn Code</em> {isResetMode ? '비밀번호 변경' : '비밀번호 찾기'}
          </h1>
          <p className="auth-page-subtitle">
            {isResetMode ? (
              '안전한 사용을 위해 새로운 비밀번호를 설정해주세요.'
            ) : (
              <>
                가입하신 이메일 주소를 입력하시면 <br />
                비밀번호 재설정 링크를 보내드립니다.
              </>
            )}
          </p>
        </div>

        {!isResetMode ? (
          <form onSubmit={handleRequestSubmit} className="auth-form" noValidate>
            <Input
              type="email"
              placeholder="이메일을 입력하세요"
              name="email"
              value={email}
              onChange={handleEmailChange}
              error={!!errors.email}
              helperText={errors.email}
              disabled={loading}
              required
              autoFocus
            />
            {serverError && (
              <div className="auth-error-message">
                <span className="auth-error-icon">!</span>
                {serverError}
              </div>
            )}
            <div className="auth-submit-btn-wrapper">
              <Button
                primary
                fullWidth
                type="submit"
                loading={loading}
                disabled={isRequestDisabled}
              >
                재설정 링크 요청
              </Button>
            </div>
          </form>
        ) : (
          <form onSubmit={handleResetSubmit} className="auth-form" noValidate>
            <Input
              type="password"
              placeholder="새 비밀번호를 입력하세요"
              name="password"
              value={password}
              onChange={handlePasswordChange}
              error={!!errors.password}
              helperText={errors.password}
              disabled={loading}
              required
              autoFocus
            />
            <Input
              type="password"
              placeholder="새 비밀번호 확인"
              name="passwordConfirm"
              value={passwordConfirm}
              onChange={handlePasswordConfirmChange}
              error={!!errors.passwordConfirm}
              helperText={errors.passwordConfirm}
              disabled={loading}
              required
            />
            {serverError && (
              <div className="auth-error-message">
                <span className="auth-error-icon">!</span>
                {serverError}
              </div>
            )}
            <div className="auth-submit-btn-wrapper">
              <Button
                primary
                fullWidth
                type="submit"
                className="auth-btn-purple"
                loading={loading}
                disabled={isResetDisabled}
              >
                비밀번호 변경
              </Button>
            </div>
          </form>
        )}

        <div className="auth-links">
          <Link to="/login" className="auth-link-text">
            로그인 페이지로 돌아가기
          </Link>
        </div>

        <MessageBox
          isOpen={messageBox.isOpen}
          onClose={closeMessageBox}
          type={messageBox.type}
          title={messageBox.title}
          onConfirm={messageBox.onConfirm || closeMessageBox}
        >
          {messageBox.message}
        </MessageBox>
      </AuthLayout>

      <Footer />
    </div>
  );
};

export default ResetPasswordPage;
