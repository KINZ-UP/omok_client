import React from 'react';
import styled from 'styled-components';
import Wood from '../../assets/wood.png';
import GridContainer from '../../containers/board/GridContainer';
import { palette } from '../../lib/styles/palette';

function Board({ numOfSection, sizeRatio }) {
  return (
    <BoardBlock sizeRatio={sizeRatio}>
      <GridContainer numOfSection={numOfSection} sizeRatio={sizeRatio} />
    </BoardBlock>
  );
}

const BoardBlock = styled.div`
  background-color: ${palette.gray[9]};
  background-image: url(${Wood});
  background-size: cover;
  filter: hue-rotate(-30deg) grayscale(0.1) sepia(0.8) brightness(80%);
  padding: ${(props) => `${Math.max(2, props.sizeRatio / 2)}%`};
`;

export default Board;
