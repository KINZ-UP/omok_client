import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router';
import { create } from '../../modules/room';
import { closeModal, setDefaultTitle } from '../../modules/create';
import CreateModal from '../../components/main/CreateModal';

const defaultTitles = [
  '오목 한 겜 하실분!',
  '오목 1:1 초보만!',
  '오목 두실 분 구합니다.',
];

function CreateModalContainer({ history }) {
  const { isOpen, title, isPrivate, password, username, roomId } = useSelector(
    ({ create, user, room }) => ({
      isOpen: create.isOpen,
      title: create.title,
      isPrivate: create.isPrivate,
      password: create.password,
      username: user.username,
      roomId: room._id,
    })
  );
  const dispatch = useDispatch();
  const onClose = useCallback(() => {
    dispatch(closeModal());
  }, [dispatch]);

  const onCreate = useCallback(() => {
    dispatch(
      create({
        title,
        isPrivate,
        password,
        players: [
          {
            username,
          },
        ],
      })
    );
  }, [dispatch, isPrivate, password, title, username]);

  useEffect(() => {
    if (isOpen) {
      const idx = Math.floor(Math.random() * defaultTitles.length);
      dispatch(setDefaultTitle(defaultTitles[idx]));
    }
  }, [isOpen, dispatch]);

  useEffect(() => {
    if (roomId) {
      history.push('/board');
    }
  }, [history, roomId]);

  return <CreateModal isOpen={isOpen} onClose={onClose} onCreate={onCreate} />;
}

export default withRouter(CreateModalContainer);
