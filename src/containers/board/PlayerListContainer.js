import React from 'react';
import { useSelector } from 'react-redux';
import PlayerList from '../../components/board/Control/PlayerList';

function PlayerListContainer() {
  const { players, turnIdx, myIdx } = useSelector(({ control }) => control);

  return <PlayerList players={players} turnIdx={turnIdx} myIdx={myIdx} />;
}

export default PlayerListContainer;
