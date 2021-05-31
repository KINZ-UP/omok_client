import React from 'react';
import styled from 'styled-components';

function Stone({ color, position }) {
  return <StoneBlock color={color} position={position}></StoneBlock>;
}

const StoneBlock = styled.div`
  background-color: ${(props) => (props.color === 'white' ? '#fff' : '#000')};
  width: 10%;
  height: 10%;
  border-radius: 100%;

  position: absolute;
  top: -5%;
  left: -5%;

  transform: ${(props) =>
    `translate(${100 * props.position.x}%, ${100 * props.position.y}%)`};

  box-shadow: 3px 3px 5px rgba(0, 0, 0, 0.5);
`;
export default Stone;
