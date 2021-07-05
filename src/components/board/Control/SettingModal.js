import React from 'react';
import styled from 'styled-components';
import Modal from '../../common/Modal';
import Button from '../../common/Button';

function SettingModal({ isOpen, onClose, settingItems, onConfirm }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <SettingModalBlock>
        <h3>옵션</h3>
        <section className="main">
          {settingItems.map((item) => (
            <SettingItem key={item.name} {...item} />
          ))}
        </section>
        <section className="footer">
          <Button onClick={onConfirm}>확인</Button>
          <Button onClick={onClose}>취소</Button>
        </section>
      </SettingModalBlock>
    </Modal>
  );
}

function SettingItem({ name, currVal, options, onChange }) {
  return (
    <SettingItemBlock>
      <p className="name">{name}</p>
      <select defaultValue={currVal} onChange={onChange}>
        {options.map((option) => (
          <option key={option}>{option}</option>
        ))}
      </select>
    </SettingItemBlock>
  );
}

const SettingModalBlock = styled.div`
  width: 10rem;

  section.main {
    margin-bottom: 1rem;
  }

  section.footer {
    display: flex;
    justify-content: center;

    button + button {
      margin-left: 0.5rem;
    }
  }
`;

const SettingItemBlock = styled.div`
  padding-top: 0.5rem;
  p.name {
    margin-bottom: 0.2rem;
  }

  select {
    width: 100%;
    padding: 0.2rem;
    font-size: 1rem;
  }
`;

export default SettingModal;
