import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import Board from '../../components/board/Board';

function BoardContainer() {
  const { numOfSection } = useSelector((state) => state.control.setting);
  const sizeRatio = useMemo(() => 100 / numOfSection, [numOfSection]);

  return <Board numOfSection={numOfSection} sizeRatio={sizeRatio} />;
}

export default BoardContainer;
