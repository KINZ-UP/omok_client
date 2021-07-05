import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TempStone from '../../components/board/TempStone';
import { requestPutStone } from '../../modules/board';

function TempStoneContainer({ position, sizeRatio }) {
  const { isStarted, isMyTurn } = useSelector(({ control }) => control);
  const dispatch = useDispatch();
  const onClick = useCallback(() => {
    if (!isStarted || !isMyTurn) return;
    dispatch(requestPutStone(position));
  }, [dispatch, position, isMyTurn, isStarted]);

  return (
    <TempStone position={position} onClick={onClick} sizeRatio={sizeRatio} />
  );
}

export default TempStoneContainer;
