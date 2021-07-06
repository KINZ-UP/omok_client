import React from 'react';
import styled from 'styled-components';
import Button from './Button';
import Modal from './Modal';

function AlertModal({ message, isOpen, onClose }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <AlertModalBlock>
        <p>{message}</p>
        <div className="footer">
          <Button onClick={onClose}>확인</Button>
        </div>
      </AlertModalBlock>
    </Modal>
  );
}

const AlertModalBlock = styled.div`
  display: flex;
  flex-direction: column;

  p {
    margin-bottom: 1rem;
  }

  .footer {
    margin-left: auto;
  }
`;

export default AlertModal;
