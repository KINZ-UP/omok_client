import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
import { palette } from '../../../lib/styles/palette';
import useSocket from '../../../lib/styles/useSocket';
import room, { initializeRoomId, leaveRoom } from '../../../modules/room';
import Button from '../../common/Button';
import Chat from './Chat';
import MenuButton from './MenuButton';
import Menus from './Menus';
import PlayerList from './PlayerList';
import Stopwatch from './Stopwatch';

function Control({ history, match }) {
  const { roomId } = match.params;
  const { title, players, isStarted } = useSelector(({ room }) => room.joined);
  const socket = useSocket();
  const dispatch = useDispatch();

  return (
    <ControlBlock>
      <PlayerList players={players} />
      <Chat />
      <Stopwatch totalSec={30} remainSec={20} />
      <Menus />
    </ControlBlock>
  );
}

const ControlBlock = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: max-content minmax(0, 1fr) max-content max-content;
  background-color: ${palette.darkwoodThree[2]};
  overflow: hidden;
  padding: 0.7rem;
  grid-gap: 0.7rem;
`;

export default withRouter(Control);
