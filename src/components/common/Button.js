import React from 'react';
import styled from 'styled-components';
import { palette } from '../../lib/styles/palette';

function Button(props) {
  return <ButtonBlock {...props}></ButtonBlock>;
}

const ButtonBlock = styled.button`
  padding: 0.5rem 1rem;
  color: #fff;
  background: ${palette.beigeNeutral[4]};
  border: none;
  outline: none;
  font-family: 'Do Hyeon', sans-serif;
  font-size: 1.1rem;
  font-weight: bold;
  border-radius: 3px;
  cursor: pointer;

  &:hover {
    background: ${palette.beigeNeutral[3]};
  }
`;

export default Button;
