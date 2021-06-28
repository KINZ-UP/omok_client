import React, { useCallback, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router';
import styled from 'styled-components';
import {
  requestRollback,
  requestStartGame,
  requestSurrender,
  toggleReady,
} from '../../../modules/control';
import { leaveRoom } from '../../../modules/control';
import MenuButton from './MenuButton';

function Menus({ match, history, isStarted }) {
  const { roomId } = match.params;
  const { isOwner, players, myIdx } = useSelector(({ control }) => control);
  const { histories } = useSelector(({ board }) => board);
  const minCount = useMemo(() => {
    const { isFirst } = players[myIdx];
    return isFirst ? 1 : 2;
  }, [players, myIdx]);

  const dispatch = useDispatch();

  const onStart = useCallback(() => {
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
    <MenuesBlock>
      {isOwner ? (
        <MenuButton onClick={onStart} disabled={isStarted}>
          시작
        </MenuButton>
      ) : (
        <MenuButton onClick={onToggleReady} disabled={isStarted}>
          준비
        </MenuButton>
      )}
      <MenuButton
        onClick={onRollback}
        disabled={!isStarted && histories.length < minCount}
      >
        무르기
      </MenuButton>
      <MenuButton onClick={onSurrender} disabled={!isStarted}>
        항복
      </MenuButton>
      <MenuButton onClick={onLeaveRoom}>나가기</MenuButton>
    </MenuesBlock>
  );
}

const MenuesBlock = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  column-gap: 5%;
`;

export default withRouter(Menus);