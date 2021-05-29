import React from 'react';
import styled from 'styled-components';
import GameItem from './GameItem';

function GameList({ rooms, onClickItem }) {
  return (
    <GameListBlock>
      {rooms.map((room, idx) => {
        const { _id, title, players, isStarted } = room;
        return (
          <GameItem
            key={idx}
            title={title}
            players={players}
            isStarted={isStarted}
            onClickItem={onClickItem(_id)}
          />
        );
      })}
    </GameListBlock>
  );
}

const GameListBlock = styled.div`
  margin-top: 20px;
`;

export default GameList;
