import React, { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { palette } from '../../lib/styles/palette';
import { getRect } from '../../modules/board';
import Stone from './Stone';
import TempStone from './TempStone';

function Grid({ position, onMouseMove, onMouseLeave }) {
  const dispatch = useDispatch();
  const gridElem = useRef(null);
  useEffect(() => {
    if (gridElem) {
      dispatch(getRect(gridElem.current));
    }
  }, [dispatch, gridElem]);

  return (
    <GridBlock
      ref={gridElem}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
      {Array.from({ length: 100 }).map((_, idx) => (
        <div key={idx} className="square" />
      ))}
      <div className="stones">
        <Stone color="white" position={{ x: 3, y: 2 }} />
        <Stone color="black" position={{ x: 4, y: 2 }} />
      </div>
      <TempStone position={position} />
    </GridBlock>
  );
}

const GridBlock = styled.div`
  position: relative;
  display: grid;
  width: 100%;
  height: 100%;
  grid-template-columns: repeat(10, 1fr);
  grid-template-rows: repeat(10, 1fr);
  border: 2px solid ${palette.darkwoodThree[4]};
  .square {
    border: 1px solid ${palette.darkwoodThree[4]};
  }
`;

export default Grid;
