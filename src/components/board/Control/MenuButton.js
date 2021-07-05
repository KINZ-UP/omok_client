import React from 'react';
import styled from 'styled-components';
import { palette } from '../../../lib/styles/palette';

function MenuButton(props) {
  const { name, onClick, disabled, icon, checked } = props;
  return (
    <MenuButtonBlock onClick={onClick} disabled={disabled} checked={checked}>
      <div className="inner">
        <img src={icon} alt={name} />
      </div>
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
  cursor: pointer;

  &:disabled {
    opacity: 0.7;
    cursor: default;
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

    font-size: 2vmin;
    img {
      height: 50%;
      filter: ${(props) =>
        props.checked ? `invert(0.7)` : `brightness(110%)`};
    }
  }
`;

export default MenuButton;
