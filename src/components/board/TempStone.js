import React from 'react';
import styled, { css } from 'styled-components';

function TempStone({ position, onClick, sizeRatio }) {
  if (position.x === null || position.y === null) {
    return null;
  }
  return (
    <TempStoneBlock
      position={position}
      onClick={onClick}
      sizeRatio={sizeRatio}
    />
  );
}

const TempStoneBlock = styled.div`
  background-color: rgba(0, 0, 0, 0.5);
  position: absolute;
  border-radius: 100%;

  ${({ sizeRatio }) =>
    css`
      width: ${sizeRatio}%;
      height: ${sizeRatio}%;
      top: -${sizeRatio / 2}%;
      left: -${sizeRatio / 2}%;
    `}

  transform: ${(props) =>
    `translate(${100 * props.position.x}%, ${100 * props.position.y}%)`};
`;

export default TempStone;
