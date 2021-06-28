import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import AspectRatioBox from '../components/board/AspectRatioBox';
import Board from '../components/board/Board';
import Control from '../components/board/Control';
import { palette } from '../lib/styles/palette';
import useSocket from '../lib/styles/useSocket';
import { joinRoom, leaveRoom } from '../modules/control';
import { closeChannel } from '../modules/socket';

function BoardPage({ match, history }) {
  const { roomId } = match.params;
  let { username, joinError } = useSelector(({ user, control }) => ({
    username: user.username,
    joinError: control.joinError,
  }));
  const dispatch = useDispatch();
  const socket = useSocket();
  useEffect(() => {
    if (!roomId) {
      alert('잘못된 접근입니다.');
      dispatch(leaveRoom());
      return;
    }

    if (!socket) return;
    dispatch(joinRoom(roomId, username));
  }, [dispatch, history, roomId, socket, username]);

  useEffect(() => {
    if (joinError) {
      alert(joinError);
      dispatch(leaveRoom());
    }
  }, [dispatch, history, joinError]);

  useEffect(() => () => dispatch(closeChannel('update')), [dispatch]);

  return (
    <BoardPageBlock>
      <AspectRatioBox>
        <Board></Board>
        <Control />
      </AspectRatioBox>
    </BoardPageBlock>
  );
}

const BoardPageBlock = styled.div`
  width: 100vw;
  height: 100vh;
  background: ${palette.darkwoodThree[3]};
  display: flex;
  /* padding: 30px; */
`;

export default BoardPage;
