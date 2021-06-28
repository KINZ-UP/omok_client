import React from 'react';
import styled from 'styled-components';
import Button from '../common/Button';
import Modal from '../common/Modal';

function PasswordModal({ password, onChange, isOpen, onClose, onConfirm }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <InputBlock type="password" value={password} onChange={onChange} />
      <Footer>
        <Button onClick={onClose}>취소</Button>
        <Button onClick={onConfirm}>확인</Button>
      </Footer>
    </Modal>
  );
}

const InputBlock = styled.input``;
const Footer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 10px;
`;

export default PasswordModal;
