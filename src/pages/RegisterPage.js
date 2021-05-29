import React from 'react';
import AuthTemplate from '../components/auth/AuthTemplate';
import RegisterForm from '../containers/auth/RegisterForm';

function RegisterPage() {
  return <AuthTemplate type="register" AuthForm={RegisterForm} />;
}

export default RegisterPage;
