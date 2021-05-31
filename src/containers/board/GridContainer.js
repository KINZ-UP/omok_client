import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Grid from '../../components/board/Grid';
import { mouseLeave, mouseMove } from '../../modules/board';

function GridContainer() {
  const { mouseCoord } = useSelector(({ board }) => board);
  const dispatch = useDispatch();
  const onMouseMove = useCallback(
    (e) => {
      console.log(e.pageX, e.pageY);
      dispatch(mouseMove(e));
    },
    [dispatch]
  );

  const onMouseLeave = useCallback(() => dispatch(mouseLeave()), [dispatch]);
  return (
    <Grid
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      position={mouseCoord}
    />
  );
}

export default GridContainer;
