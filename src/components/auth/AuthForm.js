import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { palette } from '../../lib/styles/palette';
import Button from '../common/Button';

const textMap = {
  login: '로그인',
  register: '회원가입',
};

function AuthForm({ type, onChangeInput, onSubmitForm, errorMsg }) {
  const { username, password, passwordConfirm } = useSelector(
    (state) => state.auth[type]
  );

  return (
    <AuthFormBlock onSubmit={onSubmitForm}>
      <h3>{textMap[type]}</h3>
      <StyledInput
        name="username"
        placeholder="아이디"
        autoComplete="username"
        value={username}
        onChange={onChangeInput}
      />
      <StyledInput
        name="password"
        placeholder="비밀번호"
        type="password"
        value={password}
        onChange={onChangeInput}
      />
      {type === 'register' && (
        <StyledInput
          name="passwordConfirm"
          placeholder="비밀번호 확인"
          type="password"
          value={passwordConfirm}
          onChange={onChangeInput}
        />
      )}
      {errorMsg && <ErrorMsg>{errorMsg}</ErrorMsg>}
      <StyledButton>{textMap[type]}</StyledButton>
    </AuthFormBlock>
  );
}

const AuthFormBlock = styled.form`
  display: flex;
  flex-direction: column;

  > h3 {
    font-size: 1rem;
    color: ${palette.gray[7]};
    margin-bottom: 0.7rem;
  }
`;

const StyledInput = styled.input`
  width: 100%;
  height: 2rem;
  margin-bottom: 0.5rem;
  border: 0;
  outline: 0;
  color: ${palette.gray[7]};
  border-bottom: 1px solid ${palette.gray[5]};
`;

const StyledButton = styled(Button)`
  margin-top: 0.5rem;
  margin-bottom: 1rem;
  padding: 0.7rem 1rem;
`;

const ErrorMsg = styled.div`
  text-align: center;
  color: #e90000;
  font-size: 0.85rem;
  padding: 0.25rem 0;
`;

export default AuthForm;
