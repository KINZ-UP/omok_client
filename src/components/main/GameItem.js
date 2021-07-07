import React from 'react';
import styled from 'styled-components';
import { palette } from '../../lib/styles/palette';

function GameItem({ title, password, currNum, isStarted, onClickItem }) {
  return (
    <GameItemBlock onClick={onClickItem}>
      <p className="game-title">{title}</p>
      <div className="game-info">
        <p className="curr-state">{isStarted ? '진행중' : '대기중'}</p>
        <p className="curr-number">{currNum}/2</p>
      </div>
    </GameItemBlock>
  );
}

const GameItemBlock = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  padding: 15px 25px;
  border-radius: 3px;
  box-shadow: 0px 2px 3px rgba(0, 0, 0, 0.2);

  background-color: ${palette.gray[0]};
  font-family: 'Do Hyeon', sans-serif;
  font-size: 1.2em;
  cursor: pointer;

  & + & {
    margin-top: 15px;
  }

  .game-title {
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;
    font-size: 1.4rem;
    font-weight: 500;
    padding-right: 2rem;
    word-break: break-all;
  }

  .game-info {
    display: flex;
    justify-content: space-between;
    margin-left: auto;
    color: ${palette.gray[8]};

    .curr-state {
      width: 4rem;
      text-align: left;
    }
    .curr-number {
      width: 3rem;
      text-align: right;
    }
  }
`;

export default GameItem;
