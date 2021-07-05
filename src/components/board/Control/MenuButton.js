import React from 'react';
import styled from 'styled-components';
import { palette } from '../../../lib/styles/palette';

function MenuButton(props) {
  const { name, onClick, disabled } = props;
  return (
    <MenuButtonBlock onClick={onClick} disabled={disabled}>
      <div className="inner">{name}</div>
    </MenuButtonBlock>
  );
}

const MenuButtonBlock = styled.button`
  border: none;
  outline: none;
  background: ${palette.darkwoodThree[4]};
  color: white;
  width: 100%;
  padding-top: 100%;
  position: relative;

  &:disabled {
    opacity: 0.7;
  }

  .inner {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;

    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

export default MenuButton;
