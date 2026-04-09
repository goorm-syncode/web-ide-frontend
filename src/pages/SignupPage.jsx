import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

import AuthLayout from '../components/layout/AuthLayout.jsx';
import Input from '../components/common/Input.jsx';
import Button from '../components/common/Button.jsx';
import MessageBox from '../components/common/MessageBox.jsx';
import authService from '../services/auth.js';
import { mapErrorMessage } from '../services/errorMapper.js';
import Footer from '../components/layout/Footer.jsx';

const SignupPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    nickname: '',
    password: '',
    passwordConfirm: '',
  });

  const [errors, setErrors] = useState({
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

  const validateField = (name, value) => {
    switch (name) {
      case 'email':
        if (!value) return '이메일을 입력해주세요.';
        if (value.includes(' ')) return '공백은 입력할 수 없습니다.';
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return '올바른 이메일 형식을 입력해주세요.';
        if (value.length < 5 || value.length > 50)
          return '이메일은 5자 이상 50자 이하로 입력해주세요.';
        return '';
      case 'nickname':
        if (!value) return '닉네임을 입력해주세요.';
        if (value.includes(' ')) return '공백은 입력할 수 없습니다.';
        if (value.length < 2 || value.length > 50)
          return '닉네임은 2자 이상 50자 이하로 입력해주세요.';
        return '';
      case 'password':
        if (!value) return '비밀번호를 입력해주세요.';
        if (value.includes(' ')) return '공백은 입력할 수 없습니다.';
        if (value.length < 8 || value.length > 72)
          return '비밀번호는 8자 이상 72자 이하로 입력해주세요.';
        if (!/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^a-zA-Z0-9]).{8,}$/.test(value))
          return '비밀번호는 대문자, 소문자, 숫자, 특수문자를 모두 포함해야 합니다.';
        return '';
      case 'passwordConfirm':
        if (!value) return '비밀번호를 다시 확인합니다.';
        if (value !== formData.password) return '비밀번호가 일치하지 않습니다.';
        return '';
      default:
        return '';
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setErrors((prev) => ({
      ...prev,
      [name]: validateField(name, value),
    }));
  };

  const validateAll = () => {
    const newErrors = {
      email: validateField('email', formData.email),
      nickname: validateField('nickname', formData.nickname),
      password: validateField('password', formData.password),
      passwordConfirm: validateField('passwordConfirm', formData.passwordConfirm),
    };
    setErrors(newErrors);
    return !Object.values(newErrors).some((error) => error !== '');
  };

  const handleSignup = async (e) => {
    if (e) e.preventDefault();

    if (!validateAll()) return;

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
          navigate('/login');
        },
      });
    } catch (error) {
      const message = mapErrorMessage(error, '회원가입 처리 중 오류가 발생했습니다.');
      setMessageBox({
        isOpen: true,
        type: 'error',
        title: '회원가입 실패',
        message: message,
        onConfirm: null,
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
    <div
      className="signup-page-container"
      style={{ display: 'flex', flexDirection: 'column', minHeight: '100svh' }}
    >
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
          error={!!errors.email}
          helperText={errors.email}
          required
        />
        <Input
          type="text"
          placeholder="닉네임을 입력하세요"
          name="nickname"
          value={formData.nickname}
          onChange={handleChange}
          error={!!errors.nickname}
          helperText={errors.nickname}
          required
        />
        <Input
          type="password"
          placeholder="비밀번호를 입력하세요"
          name="password"
          value={formData.password}
          onChange={handleChange}
          error={!!errors.password}
          helperText={errors.password || '8~72자, 대/소문자, 숫자, 특수문자 포함'}
          required
        />
        <Input
          type="password"
          placeholder="비밀번호를 다시 확인합니다"
          name="passwordConfirm"
          value={formData.passwordConfirm}
          onChange={handleChange}
          error={!!errors.passwordConfirm}
          helperText={errors.passwordConfirm}
          required
        />
        <div className="auth-submit-btn-wrapper">
          <Button
            primary
            fullWidth
            type="submit"
            loading={loading}
            disabled={
              loading ||
              Object.values(errors).some((e) => e !== '') ||
              Object.values(formData).some((v) => v === '')
            }
          >
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
    <Footer />
  </div>
  );
};

export default SignupPage;
