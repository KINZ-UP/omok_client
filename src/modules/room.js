import { put, call, takeLatest } from 'redux-saga/effects';
import { finishLoading, startLoading } from './loading';
import * as roomApi from '../api/room';

// ACTION TYPE
const INITIALIZE = '/room/INITIALIZE';

const GET_ROOMS = 'room/GET_ROOM';
const GET_ROOMS_SUCCESS = 'room/GET_ROOM_SUCCESS';
const GET_ROOMS_FAILURE = 'room/GET_ROOM_FAILURE';

const CREATE = 'room/CREATE';
const CREATE_SUCCESS = 'room/CREATE_SUCCESS';
const CREATE_FAILURE = 'room/CREATE_FAILURE';

const JOIN = 'room/JOIN';
const JOIN_SUCCESS = 'room/JOIN_SUCCESS';
const JOIN_FAILURE = 'room/JOIN_FAILURE';

// ACTION CREATION FUNCTION
export const initialize = () => ({
  type: INITIALIZE,
});
export const create = (roomData) => ({
  type: CREATE,
  payload: roomData,
});
export const getRooms = () => ({
  type: GET_ROOMS,
});
export const join = ({ roomId, username }) => ({
  type: JOIN,
  payload: { roomId, username },
});

function* getRoomsSaga(action) {
  yield put(startLoading(GET_ROOMS));
  try {
    const resp = yield call(roomApi.getRooms, action.payload);
    yield put({ type: GET_ROOMS_SUCCESS, payload: resp.data });
  } catch (e) {
    yield put({ type: GET_ROOMS_FAILURE, payload: e, error: true });
  }
  yield put(finishLoading(GET_ROOMS));
}

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

function* joinSaga(action) {
  yield put(startLoading(JOIN));
  try {
    const resp = yield call(roomApi.join, action.payload);
    console.log(resp);
    yield put({ type: JOIN_SUCCESS, payload: resp.data });
  } catch (e) {
    console.dir(e);
    yield put({
      type: JOIN_FAILURE,
      payload: e,
      error: true,
    });
  }
  yield put(finishLoading(JOIN));
}

export function* roomSaga() {
  yield takeLatest(GET_ROOMS, getRoomsSaga);
  yield takeLatest(CREATE, createSaga);
  yield takeLatest(JOIN, joinSaga);
}

// INITIAL STATE
const initialState = {
  rooms: [],
  isJoined: false,
  joined: {
    _id: null,
    title: '',
    password: '',
    isPrivate: null,
    isStarted: null,
    players: [],
  },
  roomError: null,
};

// REDUCER
function room(state = initialState, action) {
  switch (action.type) {
    case INITIALIZE: {
      return initialState;
    }
    case GET_ROOMS_SUCCESS: {
      return {
        ...state,
        rooms: action.payload,
      };
    }
    case GET_ROOMS_FAILURE: {
      console.log(action.payload);
      return state;
    }
    case CREATE_SUCCESS: {
      const { _id, title, password, isPrivate, isStarted, players } =
        action.payload;
      return {
        ...state,
        isJoined: true,
        joined: {
          _id,
          title,
          password,
          isPrivate,
          isStarted,
          players: players.map((player) => ({ username: player.username })),
        },
        roomError: null,
      };
    }
    case CREATE_FAILURE: {
      return { ...state, roomError: action.payload };
    }
    case JOIN_SUCCESS: {
      const { _id, title, password, isPrivate, isStarted, players } =
        action.payload;
      return {
        ...state,
        isJoined: true,
        joined: {
          _id,
          title,
          password,
          isPrivate,
          isStarted,
          players: players.map((player) => ({ username: player.username })),
        },
        roomError: null,
      };
    }
    case JOIN_FAILURE: {
      const {
        status,
        data: { message },
      } = action.payload.response;

      return { ...state, roomError: { status, message } };
    }
    default:
      return state;
  }
}

export default room;
