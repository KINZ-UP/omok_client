import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router';
import { create, createRoom, setRoomId } from '../../modules/room';
import { closeModal, setDefaultTitle } from '../../modules/create';
import CreateModal from '../../components/main/CreateModal';
import useSocket from '../../lib/styles/useSocket';

const defaultTitles = [
  '오목 한 겜 하실분!',
  '오목 1:1 초보만!',
  '오목 두실 분 구합니다.',
];

function CreateModalContainer({ history }) {
  const socket = useSocket();
  const { isOpen, title, isPrivate, password, username, roomId } = useSelector(
    ({ create, user, room }) => ({
      isOpen: create.isOpen,
      title: create.title,
      isPrivate: create.isPrivate,
      password: create.password,
      username: user.username,
      roomId: room.roomId,
    })
  );
  const dispatch = useDispatch();
  const onClose = useCallback(() => {
    dispatch(closeModal());
  }, [dispatch]);

  const onCreate = useCallback(() => {
    dispatch(createRoom({ title, password }));
  }, [dispatch, title, password]);

  useEffect(() => {
    if (isOpen) {
      const idx = Math.floor(Math.random() * defaultTitles.length);
      dispatch(setDefaultTitle(defaultTitles[idx]));
    }
  }, [isOpen, dispatch]);

  // useEffect(() => {
  //   if (!socket) return;
  //   socket.on('sendRoomId', (roomId) => history.push(`/board/${roomId}`));
  // }, [socket, dispatch, history]);

  return <CreateModal isOpen={isOpen} onClose={onClose} onCreate={onCreate} />;
}

export default withRouter(CreateModalContainer);
