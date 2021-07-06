import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { togglePrivate } from '../../../modules/create';

const PrivateToggle = () => {
  const { isPrivate } = useSelector(({ create }) => create);
  const dispatch = useDispatch();
  const onCheck = useCallback(
    (isPrivate) => {
      dispatch(togglePrivate(isPrivate));
    },
    [dispatch]
  );
  return (
    <PrivateToggleBlock>
      <span>공개</span>
      <input
        type="radio"
        name="private"
        checked={!isPrivate}
        onChange={() => onCheck(false)}
      />
      <span>비공개</span>
      <input
        type="radio"
        name="private"
        checked={isPrivate}
        onChange={() => onCheck(true)}
      />
    </PrivateToggleBlock>
  );
};

const PrivateToggleBlock = styled.div`
  font-size: 0.8rem;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-bottom: 0.5rem;

  > span + input {
    margin-left: 5px;
  }

  > input + span {
    margin-left: 12px;
  }
`;

export default React.memo(PrivateToggle);
