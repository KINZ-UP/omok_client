import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import AspectRatioBox from '../components/board/AspectRatioBox';
import Board from '../components/board/Board';
import Control from '../components/board/Control';
import { palette } from '../lib/styles/palette';
import useSocket from '../lib/styles/useSocket';
import { setRoomInfo } from '../modules/room';

function BoardPage({ match, history }) {
  const { roomId } = match.params;
  let { username } = useSelector(({ user }) => ({
    username: user.username,
  }));
  const dispatch = useDispatch();
  const socket = useSocket();
  useEffect(() => {
    if (!roomId) {
      alert('잘못된 접근입니다.');
      history.push('/');
    }
    if (!socket) return;

    socket.emit('joinRoom', { roomId, username });
    socket.on('responseJoinRoom', (resp) => {
      if (!resp.success) {
        alert(resp.message);
        history.push('/');
        return;
      }

      dispatch(setRoomInfo(resp.data));
    });
  }, [dispatch, history, roomId, socket, username]);

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
