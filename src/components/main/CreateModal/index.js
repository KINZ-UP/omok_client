import React from 'react';
import styled from 'styled-components';
import Button from '../../common/Button';
import Modal from '../../common/Modal';
import CreateInput from './CreateInput';
import PrivateToggle from './PrivateToggle';

function CreateModal({ isOpen, onCreate, onClose }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div>
        <CreateInput type="text" name="title" />
        <CreateInput type="password" name="password" disabled={true} />
      </div>
      <PrivateToggle />
      <Footer>
        <Button onClick={onClose}>취소</Button>
        <Button onClick={onCreate}>생성</Button>
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
