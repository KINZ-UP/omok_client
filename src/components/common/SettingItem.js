import React from 'react';
import styled from 'styled-components';

function SettingList({ settingItems }) {
  return (
    <SettingListBlock>
      {settingItems.map((item) => (
        <SettingItem key={item.name} {...item} />
      ))}
    </SettingListBlock>
  );
}

const SettingListBlock = styled.div`
  padding-bottom: 1rem;
`;

function SettingItem({ title, name, currVal, options, onChange }) {
  return (
    <SettingItemBlock>
      <p className="name">{title}</p>
      <select name={name} defaultValue={currVal} onChange={onChange}>
        {options.map((option) => (
          <option key={option}>{option}</option>
        ))}
      </select>
    </SettingItemBlock>
  );
}

const SettingItemBlock = styled.div`
  font-size: 0.8rem;

  padding-top: 0.5rem;
  /* padding-bottom: 1rem; */
  p.name {
    margin-bottom: 0.2rem;
  }

  select {
    width: 100%;
    padding: 0.2rem;
  }
`;

export default SettingList;
