import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Control from '../../components/board/Control';
import useSocket from '../../lib/styles/useSocket';
import { joinRoom, leaveRoom } from '../../modules/control';
import { closeChannel } from '../../modules/socket';

function ControlContainer({ match }) {
  const { isJoined, players, turnIdx, joinError } = useSelector(
    ({ control }) => control
  );
  const { username } = useSelector(({ user }) => user);
  const { roomId } = match.params;

  const dispatch = useDispatch();
  const socket = useSocket();

  useEffect(() => {
    if (!socket) return;

    if (!roomId || !username) {
      alert('잘못된 접근입니다.');
      dispatch(leaveRoom());
      return;
    }

    dispatch(joinRoom(roomId, username));
  }, [dispatch, roomId, socket, username]);

  useEffect(() => {
    if (joinError) {
      alert(joinError.message);
      const flag = joinError.type === 'ANOTHER_CONNECTION';
      dispatch(leaveRoom(flag));
    }
  }, [dispatch, joinError]);

  useEffect(() => () => dispatch(closeChannel('update')), [dispatch]);

  return <Control isJoined={isJoined} players={players} turnIdx={turnIdx} />;
}

export default withRouter(ControlContainer);
