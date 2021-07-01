import React, { useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router';
import Menus from '../../components/board/Control/Menus';
import {
  leaveRoom,
  requestRollback,
  requestStartGame,
  requestSurrender,
  toggleReady,
} from '../../modules/control';

function MenusContainer({ history }) {
  const { isOwner, players, myIdx, isStarted } = useSelector(
    ({ control }) => control
  );
  const { histories } = useSelector(({ board }) => board);
  const minCount = useMemo(() => {
    const { isFirst } = players[myIdx];
    return isFirst ? 1 : 2;
  }, [players, myIdx]);

  const dispatch = useDispatch();

  const onStart = useCallback(() => {
    if (players.length < 2) {
      alert('상대 플레이어가 없습니다.');
      return;
    }
    if (!players.every((player) => player.isReady)) {
      alert('상대 플레이어가 아직 준비하지 않았습니다.');
      return;
    }
    dispatch(requestStartGame());
  }, [dispatch, players]);
  const onToggleReady = useCallback(() => {
    dispatch(toggleReady());
  }, [dispatch]);
  const onRollback = useCallback(() => {
    dispatch(requestRollback());
  }, [dispatch]);
  const onSurrender = useCallback(() => {
    dispatch(requestSurrender());
  }, [dispatch]);
  const onLeaveRoom = useCallback(() => {
    let flag = true;
    if (isStarted) {
      flag = window.confirm('게임이 아직 진행중입니다. 정말 나가시겠습니까?');
    }
    if (!flag) return;
    if (isStarted) dispatch(requestSurrender());
    dispatch(leaveRoom());
    history.push('/');
  }, [dispatch, history, isStarted]);

  return (
    <Menus
      isOwner={isOwner}
      isStarted={isStarted}
      histories={histories}
      minCount={minCount}
      onStart={onStart}
      onToggleReady={onToggleReady}
      onRollback={onRollback}
      onSurrender={onSurrender}
      onLeaveRoom={onLeaveRoom}
    />
  );
}

export default withRouter(MenusContainer);
