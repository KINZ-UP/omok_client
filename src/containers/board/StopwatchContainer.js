import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Stopwatch from '../../components/board/Control/Stopwatch';
import { resetTimer } from '../../modules/control';

function StopwatchContainer() {
  const {
    remainTime,
    setting: { totalTime },
    isStarted,
    isMyTurn,
  } = useSelector(({ control }) => control);
  const dispatch = useDispatch();

  useEffect(() => dispatch(resetTimer()), [dispatch]);

  return (
    <Stopwatch
      remainTime={remainTime}
      totalTime={totalTime}
      isStarted={isStarted}
      isMyTurn={isMyTurn}
    />
  );
}

export default StopwatchContainer;
