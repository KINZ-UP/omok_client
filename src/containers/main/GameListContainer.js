import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router';
import GameList from '../../components/main/GameList';
import { getRooms, join } from '../../modules/room';

function GameListContainer({ history }) {
  const dispatch = useDispatch();
  const { rooms, username, isJoined } = useSelector(({ room, user }) => ({
    rooms: room.rooms,
    username: user.username,
    isJoined: room.isJoined,
  }));

  useEffect(() => {
    dispatch(getRooms());
  }, [dispatch]);

  const onClickItem = useCallback(
    (roomId) => () => {
      dispatch(join({ roomId, username }));
    },
    [dispatch, username]
  );

  useEffect(() => {
    if (isJoined) {
      history.push('/board');
    }
  }, [history, isJoined]);

  return <GameList rooms={rooms} onClickItem={onClickItem} />;
}

export default withRouter(GameListContainer);
