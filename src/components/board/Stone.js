import React from 'react';
import styled, { css } from 'styled-components';

function Stone({ color, position, isLast }) {
  return <StoneBlock color={color} position={position} isLast={isLast} />;
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

  z-index: 1;

  ${(props) =>
    props.isLast &&
    css`
      &::after {
        content: '';
        display: block;
        margin-top: 50%;
        margin-left: 50%;
        width: 35%;
        height: 35%;
        background-color: ${props.color === 'white' ? '#000' : '#fff'};
        clip-path: polygon(100% 0, 0 100%, 0 0);
      }
    `}
`;

export default React.memo(Stone);
