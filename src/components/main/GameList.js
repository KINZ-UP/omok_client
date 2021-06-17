import React from 'react';
import styled from 'styled-components';
import GameItem from './GameItem';

function GameList({ rooms, onClickItem }) {
  if (!rooms.length)
    return <EmptyListBlock>개설된 방이 없습니다.</EmptyListBlock>;

  return (
    <GameListBlock>
      {rooms.map((room, idx) => {
        const { id, title, currNum, isStarted } = room;
        return (
          <GameItem
            key={idx}
            title={title}
            currNum={currNum}
            isStarted={isStarted}
            onClickItem={onClickItem(id)}
          />
        );
      })}
    </GameListBlock>
  );
}

const EmptyListBlock = styled.div`
  text-align: center;
  margin-top: 30px;
  color: #777;
`;
const GameListBlock = styled.div`
  margin-top: 20px;
`;

export default GameList;
