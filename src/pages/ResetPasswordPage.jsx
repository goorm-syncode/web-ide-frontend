import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AuthLayout from '../components/layout/AuthLayout';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import MessageBox from '../components/common/MessageBox';
import authService from '../services/auth';
import { mapErrorMessage } from '../services/errorMapper';

const ResetPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [messageBox, setMessageBox] = useState({
    isOpen: false,
    type: 'info',
    title: '',
    message: '',
  });

  const validateEmail = (value) => {
    if (!value) return '이메일을 입력해주세요.';
    if (value.includes(' ')) return '공백은 입력할 수 없습니다.';
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) return '올바른 이메일 형식을 입력해주세요.';
    if (value.length < 5 || value.length > 50) return '이메일은 5자 이상 50자 이하로 입력해주세요.';
    return '';
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    setError(validateEmail(value));
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();

    const validationError = validateEmail(email);
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);
    try {
      await authService.requestPasswordReset(email);
      setMessageBox({
        isOpen: true,
        type: 'success',
        title: '요청 완료',
        message: '비밀번호 재설정 링크가 이메일로 발송되었습니다. (현재 미구현 기능이나 요청은 정상 처리되었습니다)',
      });
    } catch (err) {
      const message = mapErrorMessage(err, '비밀번호 재설정 요청 중 문제가 발생했습니다.');
      setMessageBox({
        isOpen: true,
        type: 'error',
        title: '요청 실패',
        message: message,
      });
    } finally {
      setLoading(false);
    }
  };

  const closeMessageBox = () => {
    setMessageBox((prev) => ({ ...prev, isOpen: false }));
  };

  const isSubmitDisabled = loading || !email || !!error;

  return (
    <AuthLayout>
      <div className="auth-header">
        <h1 className="auth-page-title">비밀번호 찾기</h1>
        <p className="auth-page-subtitle">가입하신 이메일 주소를 입력하시면 비밀번호 재설정 링크를 보내드립니다.</p>
      </div>

      <form onSubmit={handleSubmit} className="auth-form" noValidate>
        <Input
          type="email"
          placeholder="이메일을 입력하세요"
          name="email"
          value={email}
          onChange={handleEmailChange}
          error={!!error}
          helperText={error}
          disabled={loading}
          required
        />

        <div className="auth-submit-btn-wrapper">
          <Button primary fullWidth type="submit" loading={loading} disabled={isSubmitDisabled}>
            요청 보내기
          </Button>
        </div>
      </form>

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
        onConfirm={closeMessageBox}
      >
        {messageBox.message}
      </MessageBox>
    </AuthLayout>
  );
};

export default ResetPasswordPage;
