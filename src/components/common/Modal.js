import React from 'react';
import styled from 'styled-components';

function Modal(props) {
  const { isOpen, children, onClose } = props;
  if (!isOpen) return null;
  return (
    <ModalBlock>
      <Background onClick={onClose} />
      <ModalWindow {...props}>
        <div className="modal-header">
          <button className="close-btn" onClick={onClose}>
            X
          </button>
        </div>
        {children}
      </ModalWindow>
    </ModalBlock>
  );
}

const ModalBlock = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: ${(props) => props.zIndex || 1000};
`;

const ModalWindow = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #fff;
  padding: 20px;

  .modal-header {
    display: flex;
    justify-content: flex-end;
    padding-bottom: 1rem;
  }
`;

const Background = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
`;

export default Modal;
