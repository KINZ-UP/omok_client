import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Grid from '../../components/board/Grid';
import { mouseLeave, mouseMove } from '../../modules/board';

function GridContainer({ sizeRatio, numOfSection }) {
  const { mouseCoord } = useSelector(({ board }) => board);
  const { isStarted, isMyTurn } = useSelector(({ control }) => control);

  const dispatch = useDispatch();
  const onMouseMove = useCallback(
    (e) => {
      if (!isStarted || !isMyTurn) return;
      setTimeout(() => dispatch(mouseMove(e)));
    },
    [dispatch, isStarted, isMyTurn]
  );

  const onMouseLeave = useCallback(() => dispatch(mouseLeave()), [dispatch]);

  return (
    <Grid
      numOfSection={numOfSection}
      sizeRatio={sizeRatio}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      position={mouseCoord}
    />
  );
}
export default GridContainer;
