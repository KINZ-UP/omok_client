import React from 'react';
import styled from 'styled-components';
import { palette } from '../../lib/styles/palette';

function AspectRatioBox({ children }) {
  return <AspectRatioBoxBlock>{children}</AspectRatioBoxBlock>;
}
const AspectRatioBoxBlock = styled.div`
  background: #fff;
  width: min(95vw, 600px);
  height: min(153.71vw, 970.8px);

  margin: auto;

  display: grid;
  grid-template-rows: 1.618fr 1fr;
  /* padding: min(5vmin, 30px); */

  @media (min-aspect-ratio: 1000/1618) {
    width: min(59.328vh, 600px);
    height: min(95vh, 970.8px);
  }
  @media (min-aspect-ratio: 1/1) {
    width: min(95vw, 970.8px);
    height: min(59.328vw, 600px);
    grid-template-columns: 1.618fr 1fr;
    grid-template-rows: 1fr;
  }
  @media (min-aspect-ratio: 1618/1000) {
    width: min(153.71vh, 970.8px);
    height: min(95vh, 600px);
  }
`;

export default AspectRatioBox;
