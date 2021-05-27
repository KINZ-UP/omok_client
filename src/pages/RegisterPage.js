import React from 'react';
import styled from 'styled-components';
import AuthTemplate from '../components/auth/AuthTemplate';
import RegisterForm from '../containers/auth/RegisterForm';

function RegisterPage() {
  return <AuthTemplate type="register" AuthForm={RegisterForm} />;
}

const RegisterPageBlock = styled.div``;

export default RegisterPage;
