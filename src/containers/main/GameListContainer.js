import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router';
import GameList from '../../components/main/GameList';
import useSocket from '../../lib/styles/useSocket';
import { closeModal } from '../../modules/create';
import { openPasswordModal, resetJoinError } from '../../modules/room';
import { getRooms, requestJoin } from '../../modules/room';
import { closeChannel } from '../../modules/socket';

function GameListContainer({ history }) {
  const socket = useSocket();
  const dispatch = useDispatch();

  const { loggedIn } = useSelector(({ user }) => user);
  const { rooms, requestJoinError } = useSelector(({ room }) => room);

  useEffect(() => {
    if (!socket) return;
    dispatch(getRooms());
  }, [dispatch, history, socket]);

  useEffect(() => {
    if (requestJoinError) {
      alert(requestJoinError);
      dispatch(resetJoinError());
    }
  }, [dispatch, requestJoinError]);

  const onClickItem = useCallback(
    (roomId, password) => {
      if (!loggedIn)
        return () => {
          alert('로그인 후 이용하실 수 있습니다.');
          history.push('/login');
          return;
        };
      if (!password) return () => dispatch(requestJoin({ roomId, password }));
      return () => dispatch(openPasswordModal(roomId));
    },
    [dispatch, history, loggedIn]
  );

  useEffect(
    () => () => {
      dispatch(closeModal());
      dispatch(closeChannel('roomList'));
    },
    [dispatch]
  );

  return (
    <GameList loggedIn={loggedIn} rooms={rooms} onClickItem={onClickItem} />
  );
}

export default withRouter(GameListContainer);
