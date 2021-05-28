import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { palette } from '../../../lib/styles/palette';
import { changeField } from '../../../modules/create';

const textMap = {
  title: '방 이름',
  password: '비밀번호',
};
function CreateInput({ type, name }) {
  const { title, password, isPrivate } = useSelector(({ create }) => create);
  const dispatch = useDispatch();
  const onChange = useCallback(
    (e) => {
      const { name, value } = e.target;
      if (value.length >= 30) {
        return;
      }
      dispatch(changeField({ name, value }));
    },
    [dispatch]
  );
  return (
    <CreateInputBlock>
      <p className="input-title">{textMap[name]}</p>
      <input
        type={type}
        name={name}
        value={name === 'title' ? title : password}
        disabled={name === 'password' && !isPrivate}
        onChange={onChange}
      />
    </CreateInputBlock>
  );
}

const CreateInputBlock = styled.div`
  position: relative;
  width: 250px;
  height: 2.3rem;
  margin-bottom: 10px;
  & + & {
    margin-top: 20px;
  }

  .input-title {
    position: absolute;
    left: 5px;
    top: -0.5rem;

    background: #fff;
    border-radius: 3px;
    padding: 0 3px;
    font-size: 0.8rem;
    color: ${palette.gray[7]};
  }

  input {
    width: 100%;
    height: 100%;
    border: 1px solid ${palette.gray[4]};
    padding: 0 5px;

    &:disabled {
      background: ${palette.gray[1]};
    }
  }
`;

export default React.memo(CreateInput);
