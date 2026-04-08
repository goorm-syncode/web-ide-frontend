import React from 'react';
import { Link } from 'react-router-dom';
import AuthLayout from '../components/layout/AuthLayout';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import Footer from '../components/common/Footer';

const ResetPasswordPage = () => {
  return (
    <div className="reset-password-page-container" style={{ display: 'flex', flexDirection: 'column', minHeight: '100svh' }}>
      <AuthLayout>
        <div className="auth-header">
          <h1 className="auth-page-title">비밀번호 재설정</h1>
          <p className="auth-page-subtitle">이메일을 입력하시면 비밀번호 재설정 링크를 보내드립니다.</p>
        </div>

        <form className="auth-form" noValidate onSubmit={(e) => e.preventDefault()}>
          <Input
            type="email"
            placeholder="이메일을 입력하세요"
            name="email"
          />

          <div className="auth-submit-btn-wrapper">
            <Button primary fullWidth type="submit">
              메일 보내기
            </Button>
          </div>
        </form>

        <div className="auth-links">
          <Link to="/login" className="auth-link-text">
            로그인으로 돌아가기
          </Link>
        </div>
      </AuthLayout>
      <Footer />
    </div>
  );
};

export default ResetPasswordPage;
