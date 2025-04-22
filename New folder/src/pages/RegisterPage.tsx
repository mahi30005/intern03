
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import RegisterForm from '@/components/auth/RegisterForm';

const RegisterPage = () => {
  return (
    <MainLayout>
      <div className="container py-12 flex justify-center">
        <RegisterForm />
      </div>
    </MainLayout>
  );
};

export default RegisterPage;
