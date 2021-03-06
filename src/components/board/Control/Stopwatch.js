import React, { useMemo } from 'react';
import styled from 'styled-components';
import { palette } from '../../../lib/styles/palette';

function Stopwatch({ totalTime, remainTime, isStarted, isMyTurn }) {
  const remainRatio = useMemo(
    () => (remainTime / totalTime) * 100,
    [remainTime, totalTime]
  );

  return (
    <StopwatchBlock>
      <TimerBar remainRatio={remainRatio} isStarted={isMyTurn}></TimerBar>
      <RemainSec>{remainTime}</RemainSec>
    </StopwatchBlock>
  );
}

const StopwatchBlock = styled.div`
  background: ${palette.darkwoodThree[4]};
  color: #fff;
  padding: 0.3em;
  overflow-x: hidden;
  position: relative;
`;
const TimerBar = styled.div`
  height: 100%;
  background: ${(props) =>
    props.isStarted ? '#b73' : palette.darkwoodThree[0]};
  width: ${(props) => `${props.remainRatio}%`};
`;

const RemainSec = styled.div`
  font-size: 0.9em;
  font-weight: bold;
  position: absolute;
  top: 50%;
  right: 0.6em;
  transform: translateY(-50%);
`;

export default React.memo(Stopwatch);
