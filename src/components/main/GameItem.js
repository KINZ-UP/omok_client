import React from 'react';
import styled from 'styled-components';
import { palette } from '../../lib/styles/palette';
import Key from '../../assets/icons/Key.svg';

function GameItem({
  title,
  password,
  currNum,
  isStarted,
  totalTime,
  onClickItem,
}) {
  return (
    <GameItemBlock onClick={onClickItem}>
      <div className="game-title">
        {password && <img src={Key} alt="private" />}
        <p>{title}</p>
      </div>

      <div className="game-info">
        <p className="totalTime">{totalTime}초</p>
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
  font-size: 1.2rem;
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
    display: flex;

    img {
      margin-right: 0.5em;
    }
  }

  .game-info {
    display: flex;
    /* justify-content: space-between; */
    margin-left: auto;
    color: ${palette.gray[8]};

    .totalTime {
      width: 4rem;
      text-align: right;
    }
    .curr-state {
      width: 5.5rem;
      text-align: right;
    }
    .curr-number {
      width: 4rem;
      text-align: right;
    }
  }
`;

export default GameItem;
