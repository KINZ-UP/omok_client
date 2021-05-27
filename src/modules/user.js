import { put, call, takeLatest } from 'redux-saga/effects';
import { startLoading, finishLoading } from './loading';
import * as authAPI from '../api/auth';

const GET_USER = 'auth/GET_USER';
const GET_USER_SUCCESS = 'auth/GET_USER_SUCCESS';
const GET_USER_FAILURE = 'auth/GET_USER_FAILURE';

export const getUser = () => ({
  type: GET_USER,
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
  username: null,
  error: null,
};

// REDUCER
function user(state = initialState, action) {
  switch (action.type) {
    case GET_USER_SUCCESS: {
      const { username } = action.payload;
      return {
        ...state,
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
    default:
      return state;
  }
}

export default user;
