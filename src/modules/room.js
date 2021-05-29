import { put, call, takeLatest } from 'redux-saga/effects';
import { finishLoading, startLoading } from './loading';
import * as roomApi from '../api/room';

// ACTION TYPE
const CREATE = 'room/CREATE';
const CREATE_SUCCESS = 'room/CREATE_SUCCESS';
const CREATE_FAILURE = 'room/CREATE_FAILURE';

const JOIN = 'room/JOIN';
const JOIN_SUCCESS = 'room/JOIN_SUCCESS';
const JOIN_FAILURE = 'room/JOIN_FAILURE';

// ACTION CREATION FUNCTION
export const create = (roomData) => ({
  type: CREATE,
  payload: roomData,
});

function* createSaga(action) {
  yield put(startLoading(CREATE));
  try {
    const resp = yield call(roomApi.create, action.payload);
    yield put({ type: CREATE_SUCCESS, payload: resp.data });
  } catch (e) {
    yield put({
      type: CREATE_FAILURE,
      payload: e,
      error: true,
    });
  }
  yield put(finishLoading(CREATE));
}

export function* roomSaga() {
  yield takeLatest(CREATE, createSaga);
}

// INITIAL STATE
const initialState = {
  _id: null,
  title: '',
  password: '',
  isPrivate: null,
  isStarted: null,
  players: [],
  roomError: null,
};

// REDUCER
function room(state = initialState, action) {
  switch (action.type) {
    case CREATE_SUCCESS: {
      const { _id, title, password, isPrivate, isStarted, players } =
        action.payload;
      return {
        ...state,
        _id,
        title,
        password,
        isPrivate,
        isStarted,
        players,
      };
    }
    case CREATE_FAILURE: {
      return { ...state, roomError: action.payload };
    }
    default:
      return state;
  }
}

export default room;
