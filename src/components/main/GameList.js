import React from 'react';
import styled from 'styled-components';
import GameItem from './GameItem';

const currGames = [
  {
    title: '한 겜 하실분!',
    currNumber: 1,
    isStart: false,
  },
  {
    title: '오목 두실분 !!',
    currNumber: 2,
    isStart: true,
  },
];

function GameList() {
  return (
    <GameListBlock>
      {currGames.map((game, idx) => {
        const { title, currNumber, isStart } = game;
        return (
          <GameItem
            key={idx}
            title={title}
            currNumber={currNumber}
            isStart={isStart}
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
