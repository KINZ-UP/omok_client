import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

function NoPage() {
  return (
    <NoPageBlock>
      <p>존재하지 않는 페이지입니다.</p>

      <Link to="/">홈으로</Link>
    </NoPageBlock>
  );
}

const NoPageBlock = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;

  p {
    margin-bottom: 1rem;
  }

  a {
    color: #444;
    text-decoration: underline;
  }
`;

export default NoPage;
