import React from 'react';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
import ChatContainer from '../../../containers/board/ChatContainer';
import PlayerList from './PlayerList';
import MenusContainer from '../../../containers/board/MenusContainer';
import StopwatchContainer from '../../../containers/board/StopwatchContainer';
import { palette } from '../../../lib/styles/palette';
import SettingModalContainer from '../../../containers/board/SettingModalContainer';
import AlertModalContainer from '../../../containers/common/AlertModalContainer';

function Control({ isJoined, players, turnIdx }) {
  if (!isJoined) return <ControlBlock />;

  return (
    <ControlBlock>
      <StopwatchContainer />
      <PlayerList players={players} turnIdx={turnIdx} />
      <ChatContainer />
      <MenusContainer />
      <SettingModalContainer />
      <AlertModalContainer />
    </ControlBlock>
  );
}

const ControlBlock = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: max-content max-content minmax(0, 1fr) max-content;
  background-color: ${palette.darkwoodThree[2]};
  overflow: hidden;
  padding: 0.7rem;
  grid-gap: 0.7rem;
`;

export default withRouter(Control);
