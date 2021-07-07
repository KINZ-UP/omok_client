import React from 'react';
import styled from 'styled-components';
import Button from '../common/Button';
import Modal from '../common/Modal';

function PasswordModal({ password, onChange, isOpen, onClose, onConfirm }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <PasswordModalBlock>
        <p>비밀번호를 입력하세요.</p>
        <input type="password" value={password} onChange={onChange} />
        <Footer>
          <Button onClick={onClose}>취소</Button>
          <Button onClick={onConfirm}>확인</Button>
        </Footer>
      </PasswordModalBlock>
    </Modal>
  );
}

const PasswordModalBlock = styled.div`
  p {
    margin-bottom: 0.8em;
  }
  input {
    padding: 0.5em;
    border: 1px solid #ccc;
    height: 2em;
    margin-bottom: 1.5em;
    min-width: 15em;
  }
`;
const Footer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 10px;
`;

export default PasswordModal;
