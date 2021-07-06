import {
  take,
  put,
  call,
  takeLatest,
  select,
  takeEvery,
  getContext,
} from 'redux-saga/effects';
import { finishLoading, startLoading } from './loading';
import {
  createSocketChannel,
  handleCloseChannel,
} from '../lib/styles/createSocketChannel';
import { openChannel } from './socket';
import { setRoomId } from './control';

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

const CONFIRM_PASSWORD = 'room/CONFIRM_PASSWORD';
const CONFIRM_PASSWORD_SUCCESS = 'room/CONFIRM_PASSWORD_SUCCESS';
const CONFIRM_PASSWORD_FAILURE = 'room/CONFIRM_PASSWORD_FAILURE';

const JOIN = 'room/JOIN';
const JOIN_SUCCESS = 'room/JOIN_SUCCESS';
const JOIN_FAILURE = 'room/JOIN_FAILURE';

const LEAVE_ROOM = 'room/LEAVE_ROOM';

const SET_ROOM_INFO = 'room/SET_ROOM_INFO';
const SET_ERROR = 'room/GET_ROOM_FAILURE';

const UPDATE_USER = 'room/UPDATE_USER';
const UPDATE_MESSAGE = 'room/UPDATE_MESSAGE';

const OPEN_CONTROL_CHANNEL = 'room/OPEN_CONTROL_CHANNEL';

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
export const requestJoin = ({ roomId, password }) => ({
  type: REQUEST_JOIN,
  payload: { roomId, password },
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
// export const openControlChannel = () => ({
//   type: OPEN_CONTROL_CHANNEL,
// });

function* getRoomsSaga() {
  const { socket } = yield select((state) => state.socket);
  let channel;
  try {
    socket.emit('requestRoomList');
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
    const { title, password, setting } = action.payload;
    socket.emit('onCreateRoom', { title, password, setting });

    channel = yield call(createSocketChannel, socket, 'sendRoomId');
    const roomId = yield take(channel);

    yield put(setRoomId(roomId));
    const history = yield getContext('history');
    history.push(`/board/${roomId}`);
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
    const { roomId, password } = action.payload;
    socket.emit('requestJoin', { roomId, password });
    channel = yield call(createSocketChannel, socket, 'responseRequestJoin');
    const resp = yield take(channel);

    if (resp.success) {
      yield put({ type: SET_ROOMID, payload: roomId });
      const history = yield getContext('history');
      history.push(`/board/${roomId}`);
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

export function* roomSaga() {
  yield takeEvery(GET_ROOMS, getRoomsSaga);
  yield takeLatest(CREATE_ROOM, createRoomSaga);
  yield takeLatest(REQUEST_JOIN, requestJoinSaga);
}

// INITIAL STATE
const initialState = {
  rooms: [],
  roomId: null,
  isJoined: false,
  joined: null,
  joinError: null,
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
