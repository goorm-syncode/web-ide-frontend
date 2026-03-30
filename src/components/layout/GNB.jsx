import React from 'react';
import './GNB.css';

const GNB = () => {
  return (
    <header className="gnb-container">
      <div className="gnb-inner">
        <div className="gnb-left">
          <div className="gnb-logo">
            <svg
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="32" height="32" rx="8" fill="var(--accent)" />
              <path
                d="M10 10H22M10 16H22M10 22H16"
                stroke="white"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
            </svg>
            <span className="gnb-title">Web IDE</span>
          </div>
          <nav className="gnb-nav">
             <a href="#" className="gnb-link active">Workspace</a>
             <a href="#" className="gnb-link">Marketplace</a>
             <a href="#" className="gnb-link">Community</a>
             <a href="#" className="gnb-link">Docs</a>
          </nav>
        </div>
        <div className="gnb-right">
          <button className="gnb-auth-btn">Login</button>
          <button className="gnb-auth-btn primary">Get Started</button>
        </div>
      </div>
    </header>
  );
};

export default GNB;
