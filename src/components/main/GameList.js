import React from 'react';
import styled from 'styled-components';
import GameItem from './GameItem';

function GameList({ loggedIn, rooms, onClickItem }) {
  if (!loggedIn)
    return <EmptyListBlock>로그인 후 이용하실 수 있습니다.</EmptyListBlock>;

  if (!rooms.length)
    return <EmptyListBlock>개설된 방이 없습니다.</EmptyListBlock>;

  return (
    <GameListBlock>
      {rooms.map((room, idx) => {
        const { id, title, password, currNum, isStarted, totalTime } = room;
        return (
          <GameItem
            key={idx}
            title={title}
            password={password}
            currNum={currNum}
            isStarted={isStarted}
            totalTime={totalTime}
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
