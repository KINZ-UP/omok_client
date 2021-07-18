import React from 'react';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
import ChatContainer from '../../../containers/board/ChatContainer';
import MenusContainer from '../../../containers/board/MenusContainer';
import StopwatchContainer from '../../../containers/board/StopwatchContainer';
import { palette } from '../../../lib/styles/palette';
import SettingModalContainer from '../../../containers/board/SettingModalContainer';
import AlertModalContainer from '../../../containers/common/AlertModalContainer';
import PlayerListContainer from '../../../containers/board/PlayerListContainer';

function Control({ isJoined }) {
  if (!isJoined) return <ControlBlock />;

  return (
    <ControlBlock>
      <ChatContainer />
      <PlayerListContainer />
      <StopwatchContainer />
      <MenusContainer />
      <SettingModalContainer />
      <AlertModalContainer />
    </ControlBlock>
  );
}

const ControlBlock = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: minmax(0, 1fr) max-content minmax(2em, max-content) max-content;
  background-color: ${palette.darkwoodThree[2]};
  overflow: hidden;
  padding: 0.7em;
  grid-gap: 0.5em;

  @media (max-aspect-ratio: 1/1) {
    grid-template-columns: 1.618fr 1fr;
    grid-template-rows: minmax(0, 0.6fr) minmax(0, 0.25fr) minmax(0, 1.7fr);

    div:nth-child(1) {
      grid-row: 1 / 4;
      grid-column: 1 / 2;
    }
  }
`;

export default withRouter(Control);
