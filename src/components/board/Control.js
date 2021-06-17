import React, { useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
import { palette } from '../../lib/styles/palette';
import useSocket from '../../lib/styles/useSocket';
import { initializeRoomId, leaveRoom } from '../../modules/room';
import Button from '../common/Button';

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
      <Button onClick={onLeaveRoom}>나가기</Button>
    </ControlBlock>
  );
}

const ControlBlock = styled.div`
  background-color: ${palette.darkwoodThree[2]};
  overflow: hidden;
`;
export default withRouter(Control);
