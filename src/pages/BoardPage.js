import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import AspectRatioBox from '../components/board/AspectRatioBox';
import Board from '../components/board/Board';
import Control from '../components/board/Control';
import { palette } from '../lib/styles/palette';

function BoardPage() {
  const { _id, title, isPrivate, players } = useSelector(
    ({ room }) => room.joined
  );
  return (
    <BoardPageBlock>
      <AspectRatioBox>
        <Board></Board>
        <Control />
      </AspectRatioBox>
    </BoardPageBlock>
  );
}

const BoardPageBlock = styled.div`
  width: 100vw;
  height: 100vh;
  background: ${palette.darkwoodThree[3]};
  display: flex;
  /* padding: 30px; */
`;

export default BoardPage;
