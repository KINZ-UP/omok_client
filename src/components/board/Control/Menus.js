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
  grid-gap: 0.5em;
  min-height: 0;

  @media (max-aspect-ratio: 1/1) {
    grid-gap: 0.5em;

    grid-template-columns: 1fr 1fr;
    grid-template-rows: minmax(0, 1fr) minmax(0, 1fr);
  }
`;

export default withRouter(Menus);
