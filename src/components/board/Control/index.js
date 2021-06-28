import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
import ChatContainer from '../../../containers/board/ChatContainer';
import { palette } from '../../../lib/styles/palette';
import useSocket from '../../../lib/styles/useSocket';
import { approveRollback, declineRollback } from '../../../modules/control';
import room, { initializeRoomId, leaveRoom } from '../../../modules/room';
import Button from '../../common/Button';
import Chat from './Chat';
import MenuButton from './MenuButton';
import Menus from './Menus';
import PlayerList from './PlayerList';
import Stopwatch from './Stopwatch';

function Control({ history, match }) {
  const { roomId } = match.params;
  const {
    title,
    isJoined,
    players,
    chatLog,
    isStarted,
    turnIdx,
    rollbackRequest,
  } = useSelector(({ control }) => control);

  const dispatch = useDispatch();
  useEffect(() => {
    console.log('rollbackRequest:', rollbackRequest);
    if (!rollbackRequest) return;
    const result = window.confirm(
      '상대방이 무르기를 요청하였습니다. 수락하시겠습니까?'
    );
    if (result) {
      dispatch(approveRollback());
      return;
    }
    dispatch(declineRollback());
  }, [dispatch, rollbackRequest]);
  if (!isJoined) return <ControlBlock />;

  return (
    <ControlBlock>
      <Stopwatch totalSec={30} remainSec={20} isStarted={isStarted} />
      <PlayerList players={players} turnIdx={turnIdx} />
      <ChatContainer chatLog={chatLog} />
      <Menus isStarted={isStarted} />
    </ControlBlock>
  );
}

const ControlBlock = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: max-content max-content minmax(0, 1fr) max-content;
  background-color: ${palette.darkwoodThree[2]};
  overflow: hidden;
  padding: 0.7rem;
  grid-gap: 0.7rem;
`;

export default withRouter(Control);
