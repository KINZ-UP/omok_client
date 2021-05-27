import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router';
import client from '../../api/client';
import AuthForm from '../../components/auth/AuthForm';
import { changeInput, initializeForm, register } from '../../modules/auth';
import { getUser } from '../../modules/user';

function RegisterForm({ history }) {
  const type = 'register';
  const [errorMsg, setErrorMsg] = useState(null);
  const dispatch = useDispatch();
  const { form, accessToken, authError, user } = useSelector(({ auth }) => ({
    form: auth.register,
    accessToken: auth.accessToken,
    authError: auth.authError,
    user: auth.user,
  }));
  const { username, password, passwordConfirm } = form;

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    dispatch(changeInput({ type, name, value }));
  };

  const onSubmitForm = (e) => {
    e.preventDefault();
    if ([username, password, passwordConfirm].includes('')) {
      setErrorMsg('빈 칸을 모두 입력하세요.');
      return;
    }
    if (password !== passwordConfirm) {
      setErrorMsg('비밀번호가 일치하지 않습니다.');
      return;
    }
    dispatch(register({ username, password }));
  };

  useEffect(() => () => dispatch(initializeForm(type)), [dispatch]);

  useEffect(() => {
    if (authError) {
      const { status } = authError?.response;
      if (status === 409) {
        setErrorMsg('이미 가입된 아이디입니다.');
        return;
      }
      setErrorMsg('오류 발생');
      return;
    }
    if (accessToken) {
      client.defaults.headers.common['Authorization'] = accessToken;
      dispatch(getUser());
    }
  }, [accessToken, authError, dispatch]);

  useEffect(() => {
    if (user?.username) {
      history.push('/');
    }
  }, [history, user]);

  return (
    <AuthForm
      type="register"
      onChangeInput={onChangeInput}
      onSubmitForm={onSubmitForm}
      errorMsg={errorMsg}
    />
  );
}

export default withRouter(RegisterForm);
