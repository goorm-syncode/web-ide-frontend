import React from 'react';
import GNB from './GNB';

const MainLayout = ({ children }) => {
  return (
    <div className="main-layout">
      <GNB />
      <main className="main-content">
        {children}
      </main>
    </div>
  );
};

export default MainLayout;
