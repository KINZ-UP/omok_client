import { eventChannel, buffers } from 'redux-saga';

import {
  take,
  put,
  call,
  takeLatest,
  select,
  takeEvery,
} from 'redux-saga/effects';
import { finishLoading, startLoading } from './loading';
import * as roomApi from '../api/room';
import {
  createSocketChannel,
  handleCloseChannel,
} from '../lib/styles/createSocketChannel';
import { openChannel } from './socket';

// ACTION TYPE
const INITIALIZE = '/room/INITIALIZE';

const GET_ROOMS = 'room/GET_ROOM';
const SET_ROOMS = 'room/SET_ROOMS';

const GET_ROOMID = 'room/GET_ROOMID';
const SET_ROOMID = 'room/SET_ROOMID';
const INITIALIZE_ROOMID = 'room/INITIALIZE_ROOMID';

const CREATE_ROOM = 'room/CREATE_ROOM';
const REQUEST_JOIN = 'room/REQUEST_JOIN';
const REQUEST_JOIN_FAILURE = 'room/REQUEST_JOIN_FAILURE';
const CHECK_REQUEST_JOIN_ERROR = 'room/CHECK_REQUEST_JOIN_ERROR';

const JOIN = 'room/JOIN';
const JOIN_SUCCESS = 'room/JOIN_SUCCESS';
const JOIN_FAILURE = 'room/JOIN_FAILURE';

const LEAVE_ROOM = 'room/LEAVE_ROOM';

const SET_ROOM_INFO = 'room/SET_ROOM_INFO';
const SET_ERROR = 'room/GET_ROOM_FAILURE';

// ACTION CREATION FUNCTION
export const initialize = () => ({
  type: INITIALIZE,
});
export const createRoom = (roomData) => ({
  type: CREATE_ROOM,
  payload: roomData,
});
export const getRooms = () => ({
  type: GET_ROOMS,
});
export const requestJoin = (roomId) => ({
  type: REQUEST_JOIN,
  payload: { roomId },
});
export const join = ({ roomId, username }) => ({
  type: JOIN,
  payload: { roomId, username },
});
export const leaveRoom = (roomId) => ({
  type: LEAVE_ROOM,
  payload: { roomId },
});
export const getRoomId = () => ({
  type: GET_ROOMID,
});
export const initializeRoomId = () => ({
  type: INITIALIZE_ROOMID,
});
export const setRoomInfo = ({ title, players, isStarted }) => ({
  type: SET_ROOM_INFO,
  payload: {
    title,
    players,
    isStarted,
  },
});

function* getRoomsSaga() {
  const { socket } = yield select((state) => state.socket);
  let channel;
  try {
    yield socket.emit('requestRoomList');
    channel = yield call(createSocketChannel, socket, 'sendRoomList');
    yield put(openChannel('roomList', channel));
    while (true) {
      const rooms = yield take(channel);
      yield put({ type: SET_ROOMS, payload: rooms });
    }
  } catch (e) {
    console.error(e);
    yield put({ type: SET_ERROR, payload: e });
  }
}

function* createRoomSaga(action) {
  const { socket } = yield select((state) => state.socket);
  let channel;

  yield put(startLoading(CREATE_ROOM));
  try {
    const { title, password } = action.payload;
    yield socket.emit('onCreateRoom', { title, password });

    channel = yield call(createSocketChannel, socket, 'sendRoomId');
    const roomId = yield take(channel);

    yield put({ type: SET_ROOMID, payload: roomId });
  } catch (e) {
    console.error(e);
    yield put({ type: SET_ERROR, payload: e });
  } finally {
    handleCloseChannel(channel);
    yield put(finishLoading(CREATE_ROOM));
  }
}

function* requestJoinSaga(action) {
  const { socket } = yield select((state) => state.socket);
  let channel;

  yield put(startLoading(REQUEST_JOIN));
  try {
    const { roomId } = action.payload;
    yield socket.emit('requestJoin', { roomId });
    channel = yield call(createSocketChannel, socket, 'responseRequestJoin');
    const resp = yield take(channel);

    if (resp.success) {
      yield put({ type: SET_ROOMID, payload: roomId });
    } else {
      yield put({ type: REQUEST_JOIN_FAILURE, payload: resp.message });
    }
  } catch (e) {
    console.error(e);
    yield put({ type: SET_ERROR, payload: e });
  } finally {
    handleCloseChannel(channel);
    yield put(finishLoading(REQUEST_JOIN));
  }
}

function* leaveRoomSaga(action) {
  const { roomId } = action.payload;
  const { socket } = yield select((state) => state.socket);
  yield put(initializeRoomId());
  yield socket.emit('onLeaveRoom', { roomId });
}

export function* roomSaga() {
  yield takeEvery(GET_ROOMS, getRoomsSaga);
  yield takeLatest(CREATE_ROOM, createRoomSaga);
  yield takeLatest(REQUEST_JOIN, requestJoinSaga);
  yield takeLatest(LEAVE_ROOM, leaveRoomSaga);
  // yield takeLatest(CREATE, createSaga);
  // yield takeLatest(JOIN, joinSaga);
}

// INITIAL STATE
const initialState = {
  rooms: [],
  roomId: null,
  isJoined: false,
  joined: null,
  roomError: null,
  requestJoinError: null,
};

// REDUCER
function room(state = initialState, action) {
  switch (action.type) {
    case INITIALIZE: {
      return initialState;
    }
    case SET_ROOMS: {
      return {
        ...state,
        rooms: action.payload,
      };
    }
    case REQUEST_JOIN_FAILURE: {
      return {
        ...state,
        requestJoinError: action.payload,
      };
    }
    case CHECK_REQUEST_JOIN_ERROR: {
      return {
        ...state,
        requestJoinError: null,
      };
    }
    case SET_ERROR: {
      return {
        ...state,
        roomError: action.payload,
      };
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
    case SET_ROOMID: {
      return {
        ...state,
        roomId: action.payload,
      };
    }
    case INITIALIZE_ROOMID: {
      return {
        ...state,
        roomId: null,
      };
    }
    case SET_ROOM_INFO: {
      const { title, players, isStarted } = action.payload;
      return {
        ...state,
        joined: {
          title,
          players,
          isStarted,
        },
      };
    }
    default:
      return state;
  }
}

export default room;
