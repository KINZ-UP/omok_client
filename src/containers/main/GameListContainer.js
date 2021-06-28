import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router';
import GameList from '../../components/main/GameList';
import useSocket from '../../lib/styles/useSocket';
import { closeModal } from '../../modules/create';
import { openPasswordModal } from '../../modules/passwordModal';
import { getRooms, requestJoin } from '../../modules/room';
import { closeChannel } from '../../modules/socket';

function GameListContainer({ history }) {
  const socket = useSocket();
  const dispatch = useDispatch();

  const { rooms, requestJoinError } = useSelector(({ room }) => room);

  useEffect(() => {
    if (!socket) return;
    dispatch(getRooms());
  }, [dispatch, history, socket]);

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
