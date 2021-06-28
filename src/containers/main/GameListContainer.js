import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router';
import GameList from '../../components/main/GameList';
import useSocket from '../../lib/styles/useSocket';
import { closeModal } from '../../modules/create';
import { openPasswordModal } from '../../modules/passwordModal';
import { getRoomId, getRooms, requestJoin } from '../../modules/room';
import { closeChannel } from '../../modules/socket';
// import { socket } from '../SocketContainer';

function GameListContainer({ history }) {
  const socket = useSocket();
  const dispatch = useDispatch();

  const { rooms, requestJoinError, username } = useSelector(
    ({ room, user }) => ({
      rooms: room.rooms,
      requestJoinError: room.requestJoinError,
      username: user.username,
    })
  );

  const { roomId } = useSelector(({ control }) => control);

  useEffect(() => {
    if (!socket) return;
    // socket.emit('requestRoomList');
    dispatch(getRooms());
    // dispatch(getRoomId());
  }, [dispatch, history, socket]);

  useEffect(() => {
    console.log('roomId on main page', roomId);
    if (roomId) history.push(`/board/${roomId}`);
  }, [history, roomId]);

  useEffect(() => {
    if (requestJoinError) {
      alert(requestJoinError);
    }
  }, [requestJoinError]);

  const onClickItem = useCallback(
    (roomId, isPrivate, password) => {
      if (!isPrivate) return () => dispatch(requestJoin({ roomId, password }));
      return () => dispatch(openPasswordModal(roomId));
    },
    [dispatch]
  );

  // useEffect(() => {
  //   if (!socket) return;
  //   socket.on('sendError', (message) => alert(message));
  //   socket.on('sendRoomId', (roomId) => history.push(`/board/${roomId}`));
  // }, [socket, dispatch, history]);

  // useEffect(() => {
  //   if (isJoined) {
  //     history.push('/board');
  //   }
  // }, [history, isJoined]);

  useEffect(
    () => () => {
      dispatch(closeModal());
      dispatch(closeChannel('roomList'));
    },
    [dispatch]
  );

  return <GameList rooms={rooms} onClickItem={onClickItem} />;
}

export default withRouter(GameListContainer);
