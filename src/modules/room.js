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

const CREATE_ROOM = 'room/CREATE_ROOM';
const REQUEST_JOIN = 'room/REQUEST_JOIN';
const REQUEST_JOIN_FAILURE = 'room/REQUEST_JOIN_FAILURE';
const RESET_JOIN_ERROR = 'room/RESET_JOIN_ERROR';

const INPUT_PASSWORD = 'room/INPUT_PASSWORD';
const OPEN_PASSWORD_MODAL = 'room/OPEN_PASSWORD';
const CLOSE_PASSWORD_MODAL = 'room/CLOSE_PASSWORD_MODAL';

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
export const requestJoin = ({ roomId, password }) => ({
  type: REQUEST_JOIN,
  payload: { roomId, password },
});
export const resetJoinError = () => ({
  type: RESET_JOIN_ERROR,
});
export const inputPassword = (password) => ({
  type: INPUT_PASSWORD,
  payload: { password },
});
export const openPasswordModal = (roomId) => ({
  type: OPEN_PASSWORD_MODAL,
  payload: { roomId },
});
export const closePasswordModal = () => ({
  type: CLOSE_PASSWORD_MODAL,
});

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
    socket.emit('createRoom', { title, password, setting });

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
    console.log('password', password);
    socket.emit('requestJoin', { roomId, password });
    channel = yield call(createSocketChannel, socket, 'responseRequestJoin');
    const resp = yield take(channel);

    if (resp.success) {
      // yield put({ type: SET_ROOMID, payload: roomId });
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
  joinError: null,
  roomError: null,
  requestJoinError: null,
  passwordModal: {
    isOpen: false,
    roomId: null,
    password: '',
  },
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
    case RESET_JOIN_ERROR: {
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
    case INPUT_PASSWORD: {
      const { password } = action.payload;
      return {
        ...state,
        passwordModal: {
          ...state.passwordModal,
          password,
        },
      };
    }
    case OPEN_PASSWORD_MODAL: {
      const { roomId } = action.payload;
      return {
        ...state,
        passwordModal: {
          ...state.passwordModal,
          isOpen: true,
          roomId,
        },
      };
    }
    case CLOSE_PASSWORD_MODAL: {
      return {
        ...state,
        requestJoinError: null,
        passwordModal: {
          ...state.passwordModal,
          isOpen: false,
          roomId: null,
          password: '',
        },
      };
    }
    default:
      return state;
  }
}

export default room;
