import React, { useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
import { palette } from '../../../lib/styles/palette';
import useSocket from '../../../lib/styles/useSocket';
import { initializeRoomId, leaveRoom } from '../../../modules/room';
import Button from '../../common/Button';
import Chat from './Chat';
import MenuButton from './MenuButton';
import PlayerList from './PlayerList';
import Stopwatch from './Stopwatch';

// Dummy Data
const players = [
  {
    username: '이름이당!@#',
    isOwner: true,
    isReady: false,
  },
];

function Control({ history, match }) {
  const { roomId } = match.params;
  const socket = useSocket();
  const dispatch = useDispatch();

  // const onLeaveRoom = useCallback(() => {
  //   socket.emit('onLeaveRoom');
  // }, [socket]);

  const onLeaveRoom = useCallback(() => {
    dispatch(leaveRoom(roomId));
    history.push('/');
  }, [dispatch, history, roomId]);

  return (
    <ControlBlock>
      <PlayerList players={players} />
      <Chat />
      <Stopwatch totalSec={30} remainSec={20} />
      <MenuBlock>
        <MenuButton onClick={onLeaveRoom}>시작</MenuButton>
        <MenuButton onClick={onLeaveRoom}>무르기</MenuButton>
        <MenuButton onClick={onLeaveRoom}>항복</MenuButton>
        <MenuButton onClick={onLeaveRoom}>나가기</MenuButton>
      </MenuBlock>
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

const MenuBlock = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  column-gap: 5%;
`;

export default withRouter(Control);
