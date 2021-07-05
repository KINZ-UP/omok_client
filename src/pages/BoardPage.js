import React from 'react';
import styled from 'styled-components';
import AspectRatioBox from '../components/board/AspectRatioBox';
import BoardContainer from '../containers/board/BoardContainer';
import ControlContainer from '../containers/board/ControlContainer';
import { palette } from '../lib/styles/palette';

function BoardPage() {
  return (
    <BoardPageBlock>
      <AspectRatioBox>
        <BoardContainer />
        <ControlContainer />
      </AspectRatioBox>
    </BoardPageBlock>
  );
}

const BoardPageBlock = styled.div`
  width: 100vw;
  height: 100vh;
  background: ${palette.darkwoodThree[3]};
  display: flex;
`;

export default BoardPage;
