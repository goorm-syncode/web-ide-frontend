import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

import AuthLayout from '../components/layout/AuthLayout';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import MessageBox from '../components/common/MessageBox';
import authService from '../services/auth.js';

const SignupPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    nickname: '',
    password: '',
    passwordConfirm: '',
  });

  const [loading, setLoading] = useState(false);
  const [messageBox, setMessageBox] = useState({
    isOpen: false,
    type: 'info',
    title: '',
    message: '',
    onConfirm: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validate = () => {
    const { email, nickname, password, passwordConfirm } = formData;

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return '유효한 이메일 주소를 입력해 주세요.';
    }

    if (!nickname || nickname.length < 2 || nickname.length > 50) {
      return '닉네임은 2자 이상 50자 이하로 입력해 주세요.';
    }

    // Password pattern: 8-72 chars, Uppercase, Lowercase, Number, Special
    const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^a-zA-Z0-9]).{8,72}$/;
    if (!password || !passwordRegex.test(password)) {
      return '비밀번호는 8~72자이며, 대문자, 소문자, 숫자, 특수문자를 각각 최소 1자 이상 포함해야 합니다.';
    }

    if (password !== passwordConfirm) {
      return '비밀번호가 일치하지 않습니다.';
    }

    return null;
  };

  const handleSignup = async (e) => {
    if (e) e.preventDefault();

    const validationError = validate();
    if (validationError) {
      setMessageBox({
        isOpen: true,
        type: 'warning',
        title: '입력 확인',
        message: validationError,
        onConfirm: null
      });
      return;
    }

    setLoading(true);
    try {
      const { email, nickname, password } = formData;
      await authService.signup({ email, nickname, password });
      
      setMessageBox({
        isOpen: true,
        type: 'success',
        title: '회원가입 완료',
        message: '회원가입이 성공적으로 완료되었습니다. 로그인 페이지로 이동합니다.',
        onConfirm: () => {
          // SPA routing using navigate
          navigate('/login');

        },
      });
    } catch (error) {
      setMessageBox({
        isOpen: true,
        type: 'error',
        title: '회원가입 실패',
        message: error.message || '회원가입 처리 중 오류가 발생했습니다.',
        onConfirm: null
      });
    } finally {
      setLoading(false);
    }
  };

  const closeMessageBox = () => {
    const callback = messageBox.onConfirm;
    setMessageBox((prev) => ({ ...prev, isOpen: false }));
    if (callback) {
      callback();
    }
  };

  return (
    <AuthLayout>
      <div className="auth-header">
        <h1 className="auth-page-title">회원가입</h1>
        <p className="auth-page-subtitle">서비스 이용을 위해 정보를 입력해 주세요.</p>
      </div>

      <form onSubmit={handleSignup} className="auth-form">
        <Input
          type="email"
          placeholder="이메일을 입력하세요"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <Input
          type="text"
          placeholder="닉네임을 입력하세요"
          name="nickname"
          value={formData.nickname}
          onChange={handleChange}
          required
        />
        <Input
          type="password"
          placeholder="비밀번호를 입력하세요"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
          helperText="8~72자, 대/소문자, 숫자, 특수문자 포함"
        />
        <Input
          type="password"
          placeholder="비밀번호를 다시 확인합니다"
          name="passwordConfirm"
          value={formData.passwordConfirm}
          onChange={handleChange}
          required
        />
        <div className="auth-submit-btn-wrapper">
          <Button primary fullWidth type="submit" loading={loading}>
            가입하기
          </Button>
        </div>
      </form>

      <div className="auth-links">
        <Link to="/login" className="auth-link-text">
          이미 계정이 있으신가요? 로그인
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

export default SignupPage;
