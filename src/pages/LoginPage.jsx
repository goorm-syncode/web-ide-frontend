import React from 'react';
import { Link } from 'react-router-dom';
import AuthLayout from '../components/layout/AuthLayout';
import Input from '../components/common/Input';
import Button from '../components/common/Button';

const LoginPage = () => {
  const handleLogin = (e) => {
    e.preventDefault();
    // 로그인 처리 로직 뼈대
  };

  return (
    <AuthLayout>
      <div className="auth-header">
        <h1 className="auth-page-title">로그인</h1>
        <p className="auth-page-subtitle">서비스에 로그인하여 모든 기능을 이용하세요.</p>
      </div>
      
      <form onSubmit={handleLogin} className="auth-form">
        <Input 
          type="email" 
          placeholder="이메일을 입력하세요" 
          name="email"
          required 
        />
        <Input 
          type="password" 
          placeholder="비밀번호를 입력하세요" 
          name="password"
          required 
        />
        
        <div className="auth-submit-btn-wrapper">
          <Button type="submit" variant="primary" fullWidth>
            로그인
          </Button>
        </div>
      </form>
      
      <div className="auth-links">
        <Link to="/signup" className="auth-link-text">회원가입</Link>
        <Link to="/reset-password" className="auth-link-text">비밀번호 찾기</Link>
      </div>
    </AuthLayout>
  );
};

export default LoginPage;
