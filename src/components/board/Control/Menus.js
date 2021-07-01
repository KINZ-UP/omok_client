import React from 'react';
import styled from 'styled-components';
import { withRouter } from 'react-router';
import MenuButton from './MenuButton';

function Menus({
  isOwner,
  isStarted,
  histories,
  minCount,
  onStart,
  onToggleReady,
  onRollback,
  onSurrender,
  onLeaveRoom,
}) {
  return (
    <MenuesBlock>
      {isOwner ? (
        <MenuButton onClick={onStart} disabled={isStarted}>
          시작
        </MenuButton>
      ) : (
        <MenuButton onClick={onToggleReady} disabled={isStarted}>
          준비
        </MenuButton>
      )}
      <MenuButton
        onClick={onRollback}
        disabled={!isStarted && histories.length < minCount}
      >
        무르기
      </MenuButton>
      <MenuButton onClick={onSurrender} disabled={!isStarted}>
        항복
      </MenuButton>
      <MenuButton onClick={onLeaveRoom}>나가기</MenuButton>
    </MenuesBlock>
  );
}

const MenuesBlock = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  column-gap: 5%;
`;

export default withRouter(Menus);
