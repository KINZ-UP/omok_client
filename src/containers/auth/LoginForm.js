import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router';
import client from '../../api/client';
import AuthForm from '../../components/auth/AuthForm';
import { changeInput, initializeForm, login } from '../../modules/auth';
import { getUser } from '../../modules/user';

function LoginForm({ history }) {
  const type = 'login';
  const [errorMsg, setErrorMsg] = useState(null);
  const dispatch = useDispatch();
  const { form, accessToken, authError, user } = useSelector(
    ({ auth, user }) => ({
      form: auth.login,
      accessToken: auth.accessToken,
      authError: auth.authError,
      user: user,
    })
  );
  const { username, password } = form;

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    dispatch(changeInput({ type, name, value }));
  };

  const onSubmitForm = (e) => {
    e.preventDefault();
    if (username === '' || password === '') {
      setErrorMsg('입력되지 않은 항목이 존재합니다.');
      return;
    }
    dispatch(login({ username, password }));
  };

  useEffect(
    () => () => {
      dispatch(initializeForm(type));
    },
    [dispatch]
  );

  useEffect(() => {
    if (authError) {
      const { status } = authError?.response;
      if (status === 400) {
        setErrorMsg('아이디 혹은 비밀번호를 확인하세요.');
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
      type="login"
      onChangeInput={onChangeInput}
      onSubmitForm={onSubmitForm}
      errorMsg={errorMsg}
    />
  );
}

export default withRouter(LoginForm);