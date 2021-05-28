import React from 'react';
import styled from 'styled-components';
import { palette } from '../../lib/styles/palette';

function GameItem({ title, isStart, currNumber }) {
  return (
    <GameItemBlock>
      <h3 className="game-title">{title}</h3>
      <div className="game-info">
        <p className="curr-state">{isStart ? '진행중' : '대기중'}</p>
        <p className="curr-number">{currNumber}/2</p>
      </div>
    </GameItemBlock>
  );
}

const GameItemBlock = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  padding: 20px 15px;
  border-radius: 3px;
  box-shadow: 1px 3px 3px rgba(0, 0, 0, 0.2);

  background-color: ${palette.gray[0]};

  & + & {
    margin-top: 15px;
  }

  .game-title {
    margin-right: auto;
  }

  .game-info {
    display: flex;
    justify-content: space-between;

    .curr-state {
      width: 3.5rem;
      text-align: left;
    }
    .curr-number {
      width: 2.5rem;
      text-align: right;
    }
  }
`;

export default GameItem;
