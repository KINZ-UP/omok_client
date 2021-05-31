import { put, throttle } from '@redux-saga/core/effects';

const GET_RECT = 'board/GET_RECT';
const MOUSE_MOVE = 'board/MOUSE_MOVE';
const MOUSE_MOVE_THROTTLE = 'board/MOUSE_MOVE_THROTTLE';
const MOUSE_LEAVE = 'board/MOUSE_LEAVE';
const PUT_STONE = 'board/PUT_STONE';
const ROLLBACK = 'board/ROLLBACK';

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

const initialState = {
  number: 10,
  rect: null,
  stones: [],
  grid: [],
  mouseCoord: {
    x: null,
    y: null,
  },
};

function* mouseMoveSaga(action) {
  yield put({ type: MOUSE_MOVE_THROTTLE, payload: action.payload });
}

export function* boardSaga() {
  yield throttle(300, MOUSE_MOVE, mouseMoveSaga);
}

function board(state = initialState, action) {
  switch (action.type) {
    case GET_RECT: {
      const { x, width, height } = action.payload.getBoundingClientRect();
      console.log(action.payload);
      return {
        ...state,
        rect: {
          x,
          width,
          height,
        },
      };
    }
    case MOUSE_MOVE_THROTTLE: {
      const { clientX, clientY } = action.payload;
      console.log(state.rect);
      console.log(clientX, clientY);
      return {
        ...state,
        mouseCoord: {
          x: Math.round(((clientX - state.rect.x) / state.rect.width) * 10),
          y: Math.round(((clientY - state.rect.y) / state.rect.height) * 10),
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
    default:
      return state;
  }
}

export default board;
