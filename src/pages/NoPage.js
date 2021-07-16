import React from 'react';
import styled from 'styled-components';

function NoPage() {
  return <NoPageBlock>존재하지 않는 페이지입니다.</NoPageBlock>;
}

const NoPageBlock = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
`;

export default NoPage;
