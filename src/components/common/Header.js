import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { palette } from '../../lib/styles/palette';
import Responsive from './Responsive';

function Header() {
  const username = useSelector(({ user }) => user.username);
  return (
    <HeaderBlock>
      <StyledResponsive>
        <div className="main-logo">OMOK ONLINE</div>
        <div className="auth-wrapper">
          <p>{username}님 안녕하세요!</p>
          <Link to="/login">
            <div className="link">로그인</div>
          </Link>
        </div>
      </StyledResponsive>
    </HeaderBlock>
  );
}

const HeaderBlock = styled.div`
  background-color: ${palette.darkwoodGreen[2]};
  color: #fff;
  padding: 12px 0;
  font-weight: bold;

  .main-logo {
    font-size: 1.2rem;
    margin-right: auto;
  }

  .auth-wrapper {
    display: flex;
    align-items: center;

    > p {
      font-size: 0.9rem;
    }
  }

  .link {
    padding: 5px;
    border-radius: 3px;
    text-decoration: underline;
    margin-left: 20px;
    &:hover {
      background-color: ${palette.darkwoodGreen[0]};
    }
  }
`;

const StyledResponsive = styled(Responsive)`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  height: 100%;
`;

export default Header;
