import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled, { css } from 'styled-components';
import TempStoneContainer from '../../containers/board/TempStoneContainer';
import { palette } from '../../lib/styles/palette';
import { getRect } from '../../modules/board';
import Stone from './Stone';

function Grid({
  sizeRatio,
  numOfSection,
  position,
  onMouseMove,
  onMouseLeave,
}) {
  const { histories } = useSelector(({ board }) => board);
  const dispatch = useDispatch();
  const gridElem = useRef(null);

  // The size of grid rectangle should be re-calulated whenever numOfSection is modified
  useEffect(() => {
    if (gridElem) {
      dispatch(getRect(gridElem.current));
    }
  }, [dispatch, gridElem, numOfSection]);

  useEffect(() => {
    const onGridResize = () => dispatch(getRect(gridElem.current));
    window.addEventListener('resize', onGridResize);
    return () => window.removeEventListener('resize', onGridResize);
  }, [dispatch]);

  return (
    <GridBlock
      ref={gridElem}
      numOfSection={numOfSection}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
      {Array.from({ length: numOfSection ** 2 }).map((_, idx) => (
        <div key={idx} className="square" />
      ))}
      <div className="stones">
        {histories.map((position, idx) => (
          <Stone
            key={idx}
            color={idx % 2 ? 'white' : 'black'}
            position={position}
            isLast={idx === histories.length - 1}
            sizeRatio={sizeRatio}
          />
        ))}
      </div>
      <TempStoneContainer position={position} sizeRatio={sizeRatio} />
    </GridBlock>
  );
}

const GridBlock = styled.div`
  position: relative;
  display: grid;
  width: 100%;
  height: 100%;
  ${(props) => css`
    grid-template-columns: repeat(${props.numOfSection}, 1fr);
    grid-template-rows: repeat(${props.numOfSection}, 1fr);
  `}
  border: 2px solid ${palette.darkwoodThree[4]};
  .square {
    border: 1px solid ${palette.darkwoodThree[4]};
  }
`;

export default Grid;
