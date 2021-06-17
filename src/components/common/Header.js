import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import styled from 'styled-components';
import client from '../../api/client';
import { palette } from '../../lib/styles/palette';
import { logout } from '../../modules/user';
import Responsive from './Responsive';

function Header({ history }) {
  const username = useSelector(({ user }) => user.username);
  const dispatch = useDispatch();
  const onLogout = useCallback(() => {
    sessionStorage.removeItem('Authorization');
    client.defaults.headers.common['Authorization'] = null;
    dispatch(logout());
    history.push('/login');
  }, [dispatch, history]);

  return (
    <HeaderBlock>
      <StyledResponsive>
        <div className="main-logo">OMOK ONLINE</div>
        <div className="auth-wrapper">
          {username ? (
            <>
              <p>{username}님 안녕하세요!</p>
              <div className="link" onClick={onLogout}>
                로그아웃
              </div>
            </>
          ) : (
            <Link to="/login">
              <div className="link">로그인</div>
            </Link>
          )}
        </div>
      </StyledResponsive>
    </HeaderBlock>
  );
}

const HeaderBlock = styled.div`
  background-color: ${palette.darkwoodGreen[2]};
  color: #fff;
  padding: 6px 0;
  font-weight: bold;

  .main-logo {
    margin: 0.5rem 0;
    font-size: 1.2rem;
    padding-right: 1rem;
  }

  .auth-wrapper {
    display: flex;
    align-items: center;
    margin-left: auto;

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
    cursor: pointer;
  }
`;

const StyledResponsive = styled(Responsive)`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  height: 100%;
`;

export default withRouter(Header);
