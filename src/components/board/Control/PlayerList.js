import React from 'react';
import styled from 'styled-components';
import { palette } from '../../../lib/styles/palette';

function Player({ player }) {
  if (!player) {
    return (
      <PlayerBlock style={{ opacity: 0.5 }}>상대를 기다리는 중..</PlayerBlock>
    );
  }
  const { username, isReady, isOwner } = player;
  return (
    <PlayerBlock>
      <p className="username">{username}</p>
      <div className="state">
        {isOwner ? '방장' : isReady ? '준비' : '대기'}
      </div>
    </PlayerBlock>
  );
}

const PlayerBlock = styled.div`
  width: 100%;
  height: 2.5rem;
  display: flex;
  align-items: center;
  padding: 0 0.5rem;
  color: #fff;
  font-weight: bold;

  .state {
    margin-left: auto;
    background-color: ${palette.darkwoodThree[0]};
    padding: 3px 5px;
    border-radius: 3px;
  }
`;

function PlayerList({ players }) {
  const [player1, player2] = players;
  return (
    <PlayerListBlock>
      <Player player={player1} />
      <Player player={player2} />
    </PlayerListBlock>
  );
}

const PlayerListBlock = styled.div`
  background-color: ${palette.darkwoodThree[4]};
`;

export default PlayerList;
