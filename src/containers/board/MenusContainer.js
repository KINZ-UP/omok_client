import React, { useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router';
import Menus from '../../components/board/Control/Menus';
import {
  leaveRoom,
  openSetting,
  requestStartGame,
  requestSurrender,
  toggleReady,
} from '../../modules/control';

function MenusContainer({ history }) {
  const { isOwner, players, myIdx, isStarted } = useSelector(
    ({ control }) => control
  );
  const isReady = useMemo(() => players[myIdx].isReady, [myIdx, players]);

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

  const onOpenSetting = useCallback(() => dispatch(openSetting()), [dispatch]);

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

  const canChangeSetting = useMemo(
    () => players.length === 1 || !players.every((player) => player.isReady),
    [players]
  );
  return (
    <Menus
      isOwner={isOwner}
      isStarted={isStarted}
      isReady={isReady}
      onStart={onStart}
      onToggleReady={onToggleReady}
      onSurrender={onSurrender}
      onOpenSetting={onOpenSetting}
      onLeaveRoom={onLeaveRoom}
      canChangeSetting={canChangeSetting}
    />
  );
}

export default withRouter(MenusContainer);
