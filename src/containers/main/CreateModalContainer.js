import React, {
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  useState,
} from 'react';
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

const defaultSetting = {
  totalTime: 30,
  numOfSection: 14,
};

function settingReducer(state, select) {
  switch (select.name) {
    case 'totalTime':
      return {
        ...state,
        totalTime: parseInt(select.value),
      };
    case 'numOfSection':
      return {
        ...state,
        numOfSection: parseInt(select.value),
      };
    default:
      return state;
  }
}

function CreateModalContainer() {
  const dispatch = useDispatch();
  const { isOpen, title, password } = useSelector(({ create }) => create);
  const [setting, dispatchSetting] = useReducer(settingReducer, defaultSetting);

  const onClose = useCallback(() => {
    dispatch(closeModal());
  }, [dispatch]);

  const onCreate = useCallback(() => {
    dispatch(createRoom({ title, password, setting }));
  }, [dispatch, title, password, setting]);

  const settingItems = useMemo(
    () => [
      {
        name: 'totalTime',
        title: '제한시간(초)',
        currVal: setting.totalTime,
        options: [10, 20, 30, 60, 300, 600],
        onChange: (e) => dispatchSetting(e.target),
      },
      {
        name: 'numOfSection',
        title: '칸수',
        currVal: setting.numOfSection,
        options: [10, 12, 14, 16, 18],
        onChange: (e) => dispatchSetting(e.target),
      },
    ],
    [setting]
  );

  useEffect(() => {
    if (isOpen) {
      const idx = Math.floor(Math.random() * defaultTitles.length);
      dispatch(setDefaultTitle(defaultTitles[idx]));
    }
  }, [isOpen, dispatch]);

  return (
    <CreateModal
      isOpen={isOpen}
      onClose={onClose}
      onCreate={onCreate}
      settingItems={settingItems}
      setting={setting}
      dispatchSetting={dispatchSetting}
    />
  );
}

export default withRouter(CreateModalContainer);
