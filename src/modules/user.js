import { put, call, takeLatest } from 'redux-saga/effects';
import { startLoading, finishLoading } from './loading';
import * as authAPI from '../api/auth';

const GET_TOKEN = 'user/GET_TOKEN';
const GET_USER = 'user/GET_USER';
const GET_USER_SUCCESS = 'user/GET_USER_SUCCESS';
const GET_USER_FAILURE = 'user/GET_USER_FAILURE';
const LOGOUT = 'user/LOGOUT';

export const getToken = (token) => ({
  type: GET_TOKEN,
  payload: token,
});

export const getUser = () => ({
  type: GET_USER,
});
export const logout = () => ({
  type: LOGOUT,
});

function* getUserSaga(action) {
  yield put(startLoading(GET_USER));
  try {
    const resp = yield call(authAPI.getUser, action.payload);
    yield put({ type: GET_USER_SUCCESS, payload: resp.data });
  } catch (e) {
    yield put({
      type: GET_USER_FAILURE,
      payload: e,
      error: true,
    });
  }
  yield put(finishLoading(GET_USER));
}

export function* userSaga() {
  yield takeLatest(GET_USER, getUserSaga);
}

const initialState = {
  accessToken: null,
  loggedIn: false,
  username: null,
  error: null,
};

// REDUCER
function user(state = initialState, action) {
  switch (action.type) {
    case GET_TOKEN: {
      return {
        ...state,
        accessToken: action.payload,
      };
    }
    case GET_USER_SUCCESS: {
      const { username } = action.payload;
      return {
        ...state,
        loggedIn: true,
        username,
      };
    }
    case GET_USER_FAILURE: {
      const error = action.payload;
      return {
        ...state,
        error,
      };
    }
    case LOGOUT: {
      return initialState;
    }
    default:
      return state;
  }
}

export default user;
