import React from 'react';
import { useSelector } from 'react-redux';
import styled, { css } from 'styled-components';
import { palette } from '../../../lib/styles/palette';

function Player({ player, isTurn, isSelf }) {
  if (!player) {
    return (
      <PlayerBlock style={{ opacity: 0.5 }}>상대를 기다리는 중..</PlayerBlock>
    );
  }
  const { username, isReady, isOwner, isFirst } = player;
  return (
    <PlayerBlock isReady={isReady} isSelf={isSelf}>
      <TurnMarkerBlock isFirst={isFirst} isTurn={isTurn} />
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

  .username {
    ${(props) =>
      props.isSelf &&
      css`
        text-decoration: underline;
      `}
  }
  .state {
    margin-left: auto;
    background-color: ${(props) =>
      props.isReady ? palette.darkwoodThree[0] : palette.darkwoodThree[1]};
    padding: 3px 5px;
    border-radius: 3px;
  }
`;

const TurnMarkerBlock = styled.div`
  width: 1rem;
  height: 1rem;
  background: ${(props) => (props.isFirst ? 'black' : 'white')};
  border-width: 3px;
  border-style: solid;
  border-color: ${(props) => (props.isTurn ? '#b73' : palette.gray[5])};
  border-radius: 1rem;
  margin-right: 0.5rem;
`;

function PlayerList({ players, turnIdx }) {
  const [player1, player2] = players;
  const { myIdx } = useSelector(({ control }) => control);

  return (
    <PlayerListBlock>
      <Player player={player1} isTurn={turnIdx === 0} isSelf={myIdx === 0} />
      <Player player={player2} isTurn={turnIdx === 1} isSelf={myIdx === 1} />
    </PlayerListBlock>
  );
}

const PlayerListBlock = styled.div`
  background-color: ${palette.darkwoodThree[4]};
`;

export default PlayerList;
