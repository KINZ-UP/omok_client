import React from 'react';
import styled from 'styled-components';
import { withRouter } from 'react-router';
import MenuButton from './MenuButton';
import Ready from '../../../assets/icons/Ready.svg';
import Start from '../../../assets/icons/Start.svg';
import Surrender from '../../../assets/icons/Surrender.svg';
import Setting from '../../../assets/icons/Setting.svg';
import Exit from '../../../assets/icons/Exit.svg';

function Menus({
  isOwner,
  isStarted,
  isReady,
  onStart,
  onToggleReady,
  onOpenSetting,
  onSurrender,
  onLeaveRoom,
  canChangeSetting,
}) {
  return (
    <MenuesBlock>
      {isOwner ? (
        <MenuButton
          name="시작"
          icon={Start}
          onClick={onStart}
          disabled={isStarted}
        />
      ) : (
        <MenuButton
          name="준비"
          icon={Ready}
          checked={isReady}
          onClick={onToggleReady}
          disabled={isStarted}
        />
      )}
      <MenuButton
        name="항복"
        icon={Surrender}
        onClick={onSurrender}
        disabled={!isStarted}
      />
      <MenuButton
        name="설정"
        icon={Setting}
        onClick={onOpenSetting}
        disabled={!canChangeSetting}
      />
      <MenuButton name="나가기" icon={Exit} onClick={onLeaveRoom} />
    </MenuesBlock>
  );
}

const MenuesBlock = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  column-gap: 5%;
`;

export default withRouter(Menus);
