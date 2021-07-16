import React from 'react';
import styled, { css } from 'styled-components';

function Stone({ color, position, isLast, sizeRatio }) {
  return (
    <StoneBlock
      color={color}
      position={position}
      isLast={isLast}
      sizeRatio={sizeRatio}
    />
  );
}

const StoneBlock = styled.div`
  background-color: ${(props) => (props.color === 'white' ? '#fff' : '#000')};
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

  box-shadow: ${(props) =>
    props.color === 'white'
      ? 'inset 5px 5px 5px rgba(0, 0, 0, 0.2)'
      : 'inset 3px 3px 5px rgba(255, 255, 255, 0.15)'};

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
