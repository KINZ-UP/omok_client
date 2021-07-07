import React from 'react';
import styled from 'styled-components';
import GameItem from './GameItem';

function GameList({ rooms, onClickItem }) {
  if (!rooms.length)
    return <EmptyListBlock>개설된 방이 없습니다.</EmptyListBlock>;

  return (
    <GameListBlock>
      {rooms.map((room, idx) => {
        const { id, title, password, currNum, isStarted, isPrivate } = room;
        return (
          <GameItem
            key={idx}
            title={title}
            password={password}
            isPrivate={isPrivate}
            currNum={currNum}
            isStarted={isStarted}
            onClickItem={onClickItem(id, password)}
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
