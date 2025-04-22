
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import LoginForm from '@/components/auth/LoginForm';

const LoginPage = () => {
  return (
    <MainLayout>
      <div className="container py-12 flex justify-center">
        <LoginForm />
      </div>
    </MainLayout>
  );
};

export default LoginPage;
