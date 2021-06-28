import React from 'react';
import styled from 'styled-components';

function TempStone({ position, onClick }) {
  if (position.x === null || position.y === null) {
    return null;
  }
  return (
    <TempStoneBlock position={position} onClick={onClick}></TempStoneBlock>
  );
}

const TempStoneBlock = styled.div`
  background-color: rgba(0, 0, 0, 0.5);
  width: 10%;
  height: 10%;
  border-radius: 100%;

  position: absolute;
  top: -5%;
  left: -5%;

  transform: ${(props) =>
    `translate(${100 * props.position.x}%, ${100 * props.position.y}%)`};
`;

export default TempStone;
