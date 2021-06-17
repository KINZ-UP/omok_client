import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { withRouter } from 'react-router';
import styled from 'styled-components';
import { leaveRoom } from '../../../modules/room';
import MenuButton from './MenuButton';

function Menus({ match, history, isStarted }) {
  const { roomId } = match.params;
  const dispatch = useDispatch();

  const onLeaveRoom = useCallback(() => {
    dispatch(leaveRoom(roomId));
    history.push('/');
  }, [dispatch, history, roomId]);

  return (
    <MenuesBlock>
      <MenuButton onClick={onLeaveRoom}>시작</MenuButton>
      <MenuButton onClick={onLeaveRoom}>무르기</MenuButton>
      <MenuButton onClick={onLeaveRoom}>항복</MenuButton>
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
