import React from 'react';
import styled from 'styled-components';
import { palette } from '../../lib/styles/palette';

function Control() {
  return <ControlBlock />;
}

const ControlBlock = styled.div`
  background-color: ${palette.darkwoodThree[2]};
  overflow: hidden;
`;

export default Control;
