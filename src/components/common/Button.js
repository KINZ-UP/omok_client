import React from 'react';
import styled from 'styled-components';
import { palette } from '../../lib/styles/palette';

function Button(props) {
  return <ButtonBlock {...props}></ButtonBlock>;
}

const ButtonBlock = styled.button`
  padding: 0.7rem 1rem;
  color: #fff;
  background: ${palette.darkwoodThree[4]};
  border: none;
  outline: none;
  font-size: 1rem;
  font-weight: bold;
  border-radius: 3px;
  cursor: pointer;

  &:hover {
    background: ${palette.darkwoodThree[1]};
  }
`;

export default Button;
