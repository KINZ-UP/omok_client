import React from 'react';
import styled from 'styled-components';
import Button from '../../common/Button';
import Modal from '../../common/Modal';
import SettingList from '../../common/SettingItem';
import CreateInput from './CreateInput';
import PrivateToggle from './PrivateToggle';

function CreateModal({ isOpen, onCreate, onClose, settingItems }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <CreateModalBlock>
        <CreateInput type="text" name="title" />
        <CreateInput type="password" name="password" disabled={true} />
        <PrivateToggle />
        <SettingList settingItems={settingItems} />
        <Footer>
          <Button onClick={onClose}>취소</Button>
          <Button onClick={onCreate}>생성</Button>
        </Footer>
      </CreateModalBlock>
    </Modal>
  );
}

const CreateModalBlock = styled.div`
  font-size: 0.8rem;
  display: flex;
  flex-direction: column;

  .setting {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 0.5rem;
  }
`;

const Footer = styled.div`
  margin-left: auto;
  button + button {
    margin-left: 0.5rem;
  }
`;

export default CreateModal;
