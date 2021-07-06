import React from 'react';
import styled from 'styled-components';
import Modal from '../../common/Modal';
import Button from '../../common/Button';
import SettingList from '../../common/SettingItem';

function SettingModal({ isOpen, onClose, settingItems, onConfirm }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <SettingModalBlock>
        <h3>옵션</h3>
        <SettingList settingItems={settingItems} />
        <section className="footer">
          <Button onClick={onClose}>취소</Button>
          <Button onClick={onConfirm}>확인</Button>
        </section>
      </SettingModalBlock>
    </Modal>
  );
}

const SettingModalBlock = styled.div`
  width: 10rem;
  display: flex;
  flex-direction: column;

  section.main {
    margin-bottom: 1rem;
  }

  section.footer {
    display: flex;
    margin-left: auto;

    button + button {
      margin-left: 0.5rem;
    }
  }
`;

export default SettingModal;
