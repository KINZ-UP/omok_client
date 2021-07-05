import React from 'react';
import styled from 'styled-components';
import { withRouter } from 'react-router';
import MenuButton from './MenuButton';

function Menus({
  isOwner,
  isStarted,
  onStart,
  onToggleReady,
  onOpenSetting,
  onSurrender,
  onLeaveRoom,
  canChangeSetting,
}) {
  return (
    <MenuesBlock>
      <MenuButton
        name={isOwner ? '시작' : '준비'}
        onClick={isOwner ? onStart : onToggleReady}
        disabled={isStarted}
      />
      <MenuButton name="항복" onClick={onSurrender} disabled={!isStarted} />
      <MenuButton
        name="설정"
        onClick={onOpenSetting}
        disabled={!canChangeSetting}
      />
      <MenuButton name="나가기" onClick={onLeaveRoom} />
    </MenuesBlock>
  );
}

const MenuesBlock = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  column-gap: 5%;
`;

export default withRouter(Menus);
