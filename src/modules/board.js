import { put, throttle } from '@redux-saga/core/effects';
import { call, select, take, takeLatest } from 'redux-saga/effects';
import { createSocketChannel } from '../lib/styles/createSocketChannel';
import { resetTimer, updateNotice, updateTurn } from './control';
import { openChannel } from './socket';

const GET_RECT = 'board/GET_RECT';
const MOUSE_MOVE = 'board/MOUSE_MOVE';
const MOUSE_MOVE_THROTTLE = 'board/MOUSE_MOVE_THROTTLE';
const MOUSE_LEAVE = 'board/MOUSE_LEAVE';
const MOUSE_LEAVE_THROTTLE = 'board/MOUSE_LEAVE_THROTTLE';

const INIT_GAME = 'board/INIT_GAME';
const INIT_HISTORY = 'board/INIT_HISTORY';
const GET_HISTORY = 'board/GET_HISTORY';
const REQUEST_PUT_STONE = 'board/REQUEST_PUT_STONE';
const PUT_STONE = 'board/PUT_STONE';
const PUT_STONE_ERROR = 'board/PUT_STONE_FAILURE';
const ROLLBACK = 'board/ROLLBACK';
const UPDATE_NUM_OF_SECTION = 'board/UPDATE_NUM_OF_SECTION';

export const getRect = (rect) => ({
  type: GET_RECT,
  payload: rect,
});
export const mouseMove = (event) => ({
  type: MOUSE_MOVE,
  payload: event,
});
export const mouseLeave = () => ({
  type: MOUSE_LEAVE,
});
export const initGame = (num) => ({
  type: INIT_GAME,
  payload: num,
});
export const initHistory = () => ({
  type: INIT_HISTORY,
});
export const getHistory = (histories) => ({
  type: GET_HISTORY,
  payload: histories,
});
export const requestPutStone = (position) => ({
  type: REQUEST_PUT_STONE,
  payload: { position },
});
export const updateNumOfSection = (num) => ({
  type: UPDATE_NUM_OF_SECTION,
  payload: num,
});
export const rollback = (remainLength) => ({
  type: ROLLBACK,
  payload: { remainLength },
});

const initialState = {
  numOfSection: null,
  rect: null,
  stones: [],
  histories: [],
  mouseCoord: {
    x: null,
    y: null,
  },
  error: null,
  isYourTurn: false,
};

export function* openGameChannelSaga() {
  const { socket } = yield select((state) => state.socket);
  let channel;

  channel = yield call(createSocketChannel, socket, 'game');
  yield put(openChannel('game', channel));

  try {
    while (true) {
      const action = yield take(channel);
      switch (action.type) {
        case 'PUT_STONE': {
          const { x, y, turnIdx } = action.payload;
          yield put({ type: PUT_STONE, payload: { x, y } });
          yield put(updateTurn(turnIdx));
          yield put(resetTimer());
          break;
        }
        case 'PUT_STONE_ERROR': {
          const { message } = action.payload;
          yield put({ type: PUT_STONE_ERROR, payload: action.payload });
          yield put(updateNotice(message));
          break;
        }
        default:
          break;
      }
    }
  } catch (e) {
    console.error(e);
  }
}

function* putStoneSaga(action) {
  const { socket } = yield select((state) => state.socket);
  const { roomId } = yield select((state) => state.control);
  const { position } = action.payload;

  socket.emit('putStone', { roomId, position });
}

export function* boardSaga() {
  // yield throttle(300, MOUSE_MOVE, mouseMoveSaga);
  // yield throttle(300, MOUSE_LEAVE, mouseLeaveSaga);
  yield takeLatest(REQUEST_PUT_STONE, putStoneSaga);
}

function board(state = initialState, action) {
  switch (action.type) {
    case GET_RECT: {
      const { x, y, width, height } = action.payload.getBoundingClientRect();
      console.log(x, width, height);
      return {
        ...state,
        rect: {
          x,
          y,
          width,
          height,
        },
      };
    }
    case MOUSE_MOVE: {
      const { clientX, clientY } = action.payload;
      // console.log(clientX - state.rect.x, clientY - state.rect.y);
      return {
        ...state,
        mouseCoord: {
          x: Math.round(
            ((clientX - state.rect.x) / state.rect.width) * state.numOfSection
          ),
          y: Math.round(
            ((clientY - state.rect.y) / state.rect.height) * state.numOfSection
          ),
        },
      };
    }
    case MOUSE_LEAVE:
      return {
        ...state,
        mouseCoord: {
          x: null,
          y: null,
        },
      };
    case INIT_GAME:
      return {
        ...state,
        numOfSection: action.payload,
        histories: [],
      };
    case INIT_HISTORY: {
      return {
        ...state,
        histories: [],
      };
    }
    case GET_HISTORY: {
      return {
        ...state,
        histories: action.payload,
      };
    }
    case PUT_STONE: {
      const { x, y } = action.payload;
      return {
        ...state,
        histories: state.histories.concat({
          x,
          y,
        }),
      };
    }
    case PUT_STONE_ERROR: {
      console.log(action.payload);
      return state;
    }
    case UPDATE_NUM_OF_SECTION: {
      return {
        ...state,
        numOfSection: action.payload,
      };
    }
    case ROLLBACK: {
      const { remainLength } = action.payload;
      return { ...state, histories: state.histories.slice(0, remainLength) };
    }
    default:
      return state;
  }
}

export default board;
