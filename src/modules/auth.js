import { put, call, takeLatest } from 'redux-saga/effects';
import { startLoading, finishLoading } from './loading';
import * as authAPI from '../api/auth';

// ACTION TYPE
const CHANGE_INPUT = 'auth/CHANGE_INPUT';
const INITIALIZE_FORM = 'auth/INITIALIZE_FORM';

const LOGIN = 'auth/LOGIN';
const LOGIN_SUCCESS = 'auth/LOGIN_SUCCESS';
const LOGIN_FAILURE = 'auth/LOGIN_FAILURE';

const REGISTER = 'auth/REGISTER';
const REGISTER_SUCCESS = 'auth/REGISTER_SUCCESS';
const REGISTER_FAILURE = 'auth/REGISTER_FAILURE';

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
    yield put({ type: LOGIN_SUCCESS, payload: resp.data });
  } catch (e) {
    console.log(e.response.status);
    yield put({
      type: LOGIN_FAILURE,
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
    yield put({ type: REGISTER_SUCCESS, payload: resp.data });
  } catch (e) {
    yield put({
      type: REGISTER_FAILURE,
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
  accessToken: null,
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
    case LOGIN_SUCCESS: {
      const { accessToken } = action.payload;
      return {
        ...state,
        accessToken,
        authError: null,
      };
    }
    case REGISTER_SUCCESS: {
      const { accessToken } = action.payload;
      return {
        ...state,
        accessToken,
        authError: null,
      };
    }
    case LOGIN_FAILURE: {
      const error = action.payload;
      return {
        ...state,
        auth: null,
        authError: error,
      };
    }
    case REGISTER_FAILURE: {
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
