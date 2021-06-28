import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router';
import client from '../../api/client';
import AuthForm from '../../components/auth/AuthForm';
import {
  changeInput,
  initAuthError,
  initializeForm,
  login,
} from '../../modules/auth';
import { getUser } from '../../modules/user';

const type = 'login';

function LoginForm({ history }) {
  const [errorMsg, setErrorMsg] = useState(null);
  const {
    login: { username, password },
    authError,
  } = useSelector(({ auth }) => auth);
  const { accessToken, loggedIn } = useSelector(({ user }) => user);

  const dispatch = useDispatch();

  const onChangeInput = useCallback(
    (e) => {
      const { name, value } = e.target;
      dispatch(changeInput({ type, name, value }));
    },
    [dispatch]
  );

  const onSubmitForm = useCallback(
    (e) => {
      e.preventDefault();
      setErrorMsg('');
      dispatch(initAuthError());
      if (username === '' || password === '') {
        setErrorMsg('입력되지 않은 항목이 존재합니다.');
        return;
      }
      dispatch(login({ username, password }));
    },
    [dispatch, username, password]
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
  }, [dispatch, authError]);

  useEffect(() => {
    if (accessToken) {
      client.defaults.headers.common['Authorization'] = accessToken;
      sessionStorage.setItem('Authorization', accessToken);
      dispatch(getUser());
    }
  }, [dispatch, accessToken]);

  useEffect(() => {
    if (loggedIn) {
      history.push('/');
    }
  }, [history, loggedIn]);

  useEffect(
    () => () => {
      dispatch(initializeForm(type));
    },
    [dispatch]
  );

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
