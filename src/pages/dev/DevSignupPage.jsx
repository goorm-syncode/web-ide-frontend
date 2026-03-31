import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import SignupPage from '../SignupPage';

const DevSignupPage = () => {
  return (
    <BrowserRouter>
      <SignupPage />
    </BrowserRouter>
  );
};

export default DevSignupPage;
