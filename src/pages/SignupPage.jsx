import React from 'react';
import { Link } from 'react-router-dom';
import AuthLayout from '../components/layout/AuthLayout';
import Input from '../components/common/Input';
import Button from '../components/common/Button';

const SignupPage = () => {
  const handleSignup = (e) => {
    e.preventDefault();
  };

  return (
    <AuthLayout>
      <div className="auth-header">
        <h1 className="auth-page-title">회원가입</h1>
        <p className="auth-page-subtitle">서비스 이용을 위해 정보를 입력해 주세요.</p>
      </div>
      
      <form onSubmit={handleSignup} className="auth-form">
        <Input type="email" placeholder="이메일을 입력하세요" name="email" required />
        <Input type="text" placeholder="닉네임을 입력하세요" name="nickname" required />
        <Input type="password" placeholder="비밀번호를 입력하세요" name="password" required />
        <Input type="password" placeholder="비밀번호를 다시 확인합니다" name="passwordConfirm" required />
        <div className="auth-submit-btn-wrapper">
          <Button type="submit" variant="primary" fullWidth>가입하기</Button>
        </div>
      </form>
      
      <div className="auth-links">
        <a href="/login.html" className="auth-link-text">이미 계정이 있으신가요? 로그인</a>
      </div>
    </AuthLayout>
  );
};

export default SignupPage;
