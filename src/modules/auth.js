import { put, call, takeLatest } from 'redux-saga/effects';
import { startLoading, finishLoading } from './loading';
import * as authAPI from '../api/auth';
import { getToken } from './user';

// ACTION TYPE
const CHANGE_INPUT = 'auth/CHANGE_INPUT';
const INITIALIZE_FORM = 'auth/INITIALIZE_FORM';

const LOGIN = 'auth/LOGIN';
const REGISTER = 'auth/REGISTER';
const AUTH_FAILURE = 'auth/AUTH_FAILURE';

// ACTION CREATION FUNCTION
export const changeInput = ({ type, name, value }) => ({
  type: CHANGE_INPUT,
  payload: {
    type,
    name,
    value,
  },
});
export const initializeForm = (type) => ({
  type: INITIALIZE_FORM,
  payload: type,
});
export const login = ({ username, password }) => ({
  type: LOGIN,
  payload: {
    username,
    password,
  },
});
export const register = ({ username, password }) => ({
  type: REGISTER,
  payload: {
    username,
    password,
  },
});

// SAGAS
function* loginSaga(action) {
  yield put(startLoading(LOGIN));
  try {
    const resp = yield call(authAPI.login, action.payload);
    yield put(getToken(resp.data.accessToken));
  } catch (e) {
    yield put({
      type: AUTH_FAILURE,
      payload: e,
      error: true,
    });
  }
  yield put(finishLoading(LOGIN));
}
function* registerSaga(action) {
  yield put(startLoading(REGISTER));
  try {
    const resp = yield call(authAPI.register, action.payload);
    yield put(getToken(resp.data.accessToken));
  } catch (e) {
    yield put({
      type: AUTH_FAILURE,
      payload: e,
      error: true,
    });
  }
  yield put(finishLoading(REGISTER));
}

export function* authSaga() {
  yield takeLatest(LOGIN, loginSaga);
  yield takeLatest(REGISTER, registerSaga);
}

// INITIAL STATE
const initialState = {
  login: {
    username: '',
    password: '',
  },
  register: {
    username: '',
    password: '',
    passwordConfirm: '',
  },
  authError: null,
};

// REDUCER
function auth(state = initialState, action) {
  switch (action.type) {
    case CHANGE_INPUT: {
      const { type, name, value } = action.payload;
      return {
        ...state,
        [type]: {
          ...state[type],
          [name]: value,
        },
      };
    }
    case INITIALIZE_FORM: {
      const type = action.payload;
      return {
        ...state,
        [type]: initialState[type],
        authError: null,
      };
    }
    case AUTH_FAILURE: {
      const error = action.payload;
      return {
        ...state,
        auth: null,
        authError: error,
      };
    }
    default:
      return state;
  }
}

export default auth;
