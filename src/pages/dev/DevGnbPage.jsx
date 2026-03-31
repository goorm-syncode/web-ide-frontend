import React, { useState } from 'react';
import Gnb from '../../components/layout/Gnb';
import './DevGnbPage.css';

const DevGnbPage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  const handleLoginClick = () => setIsLoggedIn(true);
  const handleLogoutClick = () => setIsLoggedIn(false);

  return (
    <div className="dev-gnb-page">
      <div className="dev-container">
        <h2 className="dev-heading">GNB Component Sandbox</h2>
        
        <div className="dev-section">
          <h3 className="dev-subheading">1. 기본 상태 (뒤로가기 없음)</h3>
          <div className="dev-component-wrapper">
            <Gnb 
              title="Coding Test"
              userName="닉네임"
              isLoggedIn={isLoggedIn}
              onLoginClick={handleLoginClick}
              onLogoutClick={handleLogoutClick}
            />
          </div>
        </div>

        <div className="dev-section">
          <h3 className="dev-subheading">2. 활성 상태 (뒤로가기 있음)</h3>
          <div className="dev-component-wrapper">
            <Gnb 
              title="Coding Test"
              userName="닉네임"
              showBackButton={true}
              onBackClick={() => alert("뒤로 가기 기능")}
              isLoggedIn={isLoggedIn}
              onLoginClick={handleLoginClick}
              onLogoutClick={handleLogoutClick}
            />
          </div>
        </div>
        
        <div className="dev-section">
          <h3 className="dev-subheading">3. 로그아웃 강제 상태 (개발 테스트용)</h3>
          <div className="dev-component-wrapper">
            <Gnb 
              title="Coding Test"
              isLoggedIn={false}
              onLoginClick={() => alert("로그인 창으로 이동")}
            />
          </div>
        </div>
        
        <div className="dev-controls">
          <button onClick={() => setIsLoggedIn(!isLoggedIn)} className="toggle-btn">
            현재 로그인 상태 변경하기 (현재: {isLoggedIn ? '로그인 완료' : '로그아웃됨'})
          </button>
        </div>
      </div>
    </div>
  );
};

export default DevGnbPage;
