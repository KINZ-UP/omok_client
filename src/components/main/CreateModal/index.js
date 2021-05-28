import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { closeModal, setDefaultTitle } from '../../../modules/create';
import Button from '../../common/Button';
import Modal from '../../common/Modal';
import CreateInput from './CreateInput';
import PrivateToggle from './PrivateToggle';

const defaultTitles = [
  '오목 한 겜 하실분!',
  '오목 1:1 초보만!',
  '오목 두실 분 구합니다.',
];

function CreateModal() {
  const { isOpen } = useSelector(({ create }) => create);
  const dispatch = useDispatch();
  const onClose = useCallback(() => {
    dispatch(closeModal());
  }, [dispatch]);

  useEffect(() => {
    if (isOpen) {
      const idx = Math.floor(Math.random() * defaultTitles.length);
      dispatch(setDefaultTitle(defaultTitles[idx]));
    }
  }, [isOpen, dispatch]);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div>
        <CreateInput type="text" name="title" />
        <CreateInput type="password" name="password" disabled={true} />
      </div>
      <PrivateToggle />
      <Footer>
        <Button onClick={onClose}>취소</Button>
        <Button>생성</Button>
      </Footer>
    </Modal>
  );
}

const Footer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 10px;
`;

export default CreateModal;
