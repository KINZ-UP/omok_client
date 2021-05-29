import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

function BoardPage() {
  const { _id, title, isPrivate, players } = useSelector(
    ({ room }) => room.joined
  );
  return (
    <BoardPageBlock>
      <h1>{title}</h1>
    </BoardPageBlock>
  );
}

const BoardPageBlock = styled.div``;

export default BoardPage;
