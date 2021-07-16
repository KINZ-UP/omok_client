import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import LoginForm from '../../containers/auth/LoginForm';
import RegisterForm from '../../containers/auth/RegisterForm';
import { palette } from '../../lib/styles/palette';

function AuthTemplate({ type }) {
  return (
    <AuthTemplateBlock>
      <WhiteBox>
        <h3>OMOK ONLINE</h3>
        {type === 'login' ? (
          <>
            <LoginForm />
            <Footer>
              <Link to="/register">회원가입</Link>
            </Footer>
          </>
        ) : (
          <>
            <RegisterForm />
            <Footer>
              <Link to="/login">로그인</Link>
            </Footer>
          </>
        )}
      </WhiteBox>
    </AuthTemplateBlock>
  );
}

const AuthTemplateBlock = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: ${palette.gray[3]};
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
`;

const WhiteBox = styled.div`
  width: min(20rem, 100%);
  background: #fff;
  border-radius: 5px;
  padding: 15px 25px 40px 25px;

  > h3 {
    font-size: 1rem;
    padding: 1rem 2rem;
    margin-bottom: 1rem;
    color: ${palette.gray[8]};
    text-align: center;
  }
`;

const Footer = styled.div`
  display: flex;
  justify-content: flex-end;
  font-size: 0.85rem;
  text-decoration: underline;

  > a {
    color: ${palette.gray[6]};
    &:hover {
      color: ${palette.gray[9]};
    }
  }
`;

export default AuthTemplate;
