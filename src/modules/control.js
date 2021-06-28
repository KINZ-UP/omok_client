import {
  call,
  fork,
  getContext,
  put,
  select,
  take,
  takeEvery,
  takeLatest,
} from 'redux-saga/effects';
import { createSocketChannel } from '../lib/styles/createSocketChannel';
import {
  getHistory,
  initHistory,
  openGameChannelSaga,
  rollback,
} from './board';
import { closeChannel, openChannel } from './socket';

const INITIALIZE = 'control/INITIALIZE';
const SET_ROOMID = 'control/SET_ROOMID';
const JOIN_ROOM = 'control/JOIN';
const JOIN_ROOM_SUCCESS = 'control/JOIN_ROOM_SUCCESS';
const JOIN_ROOM_FAILURE = 'control/JOIN_ROOM_FAILURE';
const LEAVE_ROOM = 'control/LEAVE_ROOM';
const NEW_PLAYER = 'control/NEW_PLAYER';
const EXIT_USER = 'control/EXIT_USER';
const SEND_MESSAGE = 'control/SEND_MESSAGE';
const UPDATE_MESSAGE = 'control/UPDATE_MESSAGE';
const CHANGE_MESSAGE = 'control/CHANGE_MESSAGE';
const INIT_MESSAGE = 'control/INIT_MESSAGE';
const TOGGLE_READY = 'control/TOGGLE_READY';
const UPDATE_READY = 'control/UPDATE_READY';
const REQUEST_START_GAME = 'control/REQUEST_START_GAME';
const START_GAME = 'control/START_GAME';
const REQUEST_SURRENDER = 'control/REQUEST_SURRENDER';
const END_GAME = 'control/END_GAME';
const REQUEST_PUT_STONE = 'control/REQUEST_PUT_STONE';
const PUT_STONE = 'control/PUT_STONE';
const REQUEST_ROLLBACK = 'control/REQUEST_ROLLBACK';
const GET_ROLLBACK_REQUEST = 'control/GET_ROLLBACK_REQUEST';
const APPROVE_ROLLBACK = 'control/APPROVE_ROLLBACK';
const DECLINE_ROLLBACK = 'control/DECLINE_ROLLBACK';
const INIT_ROLLBACK_REQUEST = 'control/INIT_ROLLBACK_REQUEST';
const UPDATE_TURN = 'control/UPDATE_TURN';

export const initialize = () => ({
  type: INITIALIZE,
});
export const setRoomId = (roomId) => ({
  type: SET_ROOMID,
  payload: { roomId },
});
export const joinRoom = (roomId, username) => ({
  type: JOIN_ROOM,
  payload: { roomId, username },
});
export const leaveRoom = (isReplace) => ({
  type: LEAVE_ROOM,
  payload: isReplace,
});
export const newPlayer = (player) => ({
  type: NEW_PLAYER,
  payload: player,
});
export const changeMessage = (text) => ({
  type: CHANGE_MESSAGE,
  payload: text,
});
export const sendMessage = () => ({
  type: SEND_MESSAGE,
});
export const toggleReady = () => ({
  type: TOGGLE_READY,
});
export const requestStartGame = () => ({
  type: REQUEST_START_GAME,
});
export const startGame = () => ({
  type: START_GAME,
});
export const requestSurrender = () => ({
  type: REQUEST_SURRENDER,
});
export const requestPutStone = (position) => ({
  type: REQUEST_PUT_STONE,
  payload: { position },
});
export const requestRollback = () => ({
  type: REQUEST_ROLLBACK,
});
export const getRollbackRequest = () => ({
  type: GET_ROLLBACK_REQUEST,
});
export const approveRollback = () => ({
  type: APPROVE_ROLLBACK,
});
export const declineRollback = () => ({
  type: DECLINE_ROLLBACK,
});
export const updateTurn = (idx) => ({
  type: UPDATE_TURN,
  payload: idx,
});

export function* openControlChannelSaga() {
  const { socket } = yield select((state) => state.socket);
  let channel;

  channel = yield call(createSocketChannel, socket, 'update');
  yield put(openChannel('update', channel));

  try {
    while (true) {
      const action = yield take(channel);
      switch (action.type) {
        case 'NEW_USER': {
          yield put({ type: NEW_PLAYER, payload: action.username });
          break;
        }
        case 'EXIT_USER': {
          const { players, exitUser } = action.payload;
          yield put({ type: EXIT_USER, payload: { players, exitUser } });
          break;
        }
        case 'MESSAGE': {
          const { username, content } = action.payload;
          const message = {
            username,
            content,
            isSelf: false,
          };
          yield put({ type: UPDATE_MESSAGE, payload: message });
          break;
        }
        case 'TOGGLE_READY': {
          const { username } = action.payload;
          yield put({ type: UPDATE_READY, payload: username });
          break;
        }
        case 'START': {
          const { turnIdx } = action.payload;
          yield put(initHistory());
          yield fork(openGameChannelSaga);
          yield put({ type: START_GAME, payload: { turnIdx } });
          break;
        }
        case 'START_ERROR': {
          const { message } = action.payload;
          alert(message);
          break;
        }
        case 'END': {
          const { winnerIdx } = action.payload;
          yield put({ type: END_GAME, payload: { winnerIdx } });
          yield put(closeChannel('game'));
          break;
        }
        case 'REQUEST_ROLLBACK': {
          yield put({ type: GET_ROLLBACK_REQUEST });
          break;
        }
        case 'ROLLBACK': {
          const { remainLength } = action.payload;
          yield put(rollback(remainLength));
          break;
        }
        case 'DECLINE_ROLLBACK': {
          console.log('rollback request has been declined');
          alert('거절!!');
          break;
        }
        case 'ANOTHER_CONNECTION': {
          alert('다른 기기에서 접속하였습니다.');
          yield put({ type: LEAVE_ROOM, payload: true });
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

function* joinRoomSaga(action) {
  const { roomId, username } = action.payload;
  yield put({ type: SET_ROOMID, payload: { roomId } });
  const { socket } = yield select((state) => state.socket);
  let channel;

  socket.emit('joinRoom', { roomId: roomId, username: username });
  channel = yield call(createSocketChannel, socket, 'responseJoinRoom');
  const resp = yield take(channel);
  console.log(resp);

  if (resp.success) {
    const { players, isStarted, turnIdx, history } = resp.data;
    yield put({
      type: JOIN_ROOM_SUCCESS,
      payload: { players, isStarted, turnIdx, username },
    });
    yield fork(openControlChannelSaga);

    if (isStarted) {
      yield put(getHistory(history));
      yield fork(openGameChannelSaga);
    }
  } else {
    yield put({ type: JOIN_ROOM_FAILURE, payload: resp.message });
  }
}

function* leaveRoomSaga(action) {
  const { socket } = yield select((state) => state.socket);
  const { roomId } = yield select((state) => state.control);
  console.log('You have left the Room', roomId);

  const history = yield getContext('history');
  history.push('/');

  yield put({ type: INITIALIZE });

  const isReplace = action.payload;
  if (isReplace) return;

  socket.emit('onLeaveRoom', { roomId });
}

function* sendMessageSaga() {
  const { socket } = yield select((state) => state.socket);
  const { username } = yield select((state) => state.user);
  const roomId = yield select((state) => state.control.roomId);
  const chatInput = yield select((state) => state.control.chatInput);
  socket.emit('sendMessage', { roomId: roomId, message: chatInput });
  const message = {
    username,
    isSelf: true,
    content: chatInput,
  };
  yield put({ type: UPDATE_MESSAGE, payload: message });
  yield put({ type: INIT_MESSAGE });
}

function* toggleReadySaga() {
  const { socket } = yield select((state) => state.socket);
  const { username } = yield select((state) => state.user);
  const { roomId } = yield select((state) => state.control);

  socket.emit('toggleReady', roomId);
  yield put({ type: UPDATE_READY, payload: username });
}

function* startGameSaga() {
  const { socket } = yield select((state) => state.socket);
  const { roomId } = yield select((state) => state.control);
  socket.emit('startGame', roomId);
}

function* rollbackSaga() {
  const { socket } = yield select((state) => state.socket);
  const { roomId } = yield select((state) => state.control);
  console.log('requested rollback');
  socket.emit('rollback', { roomId });
}

function* approveRollbackSaga() {
  console.log('Approved rollback');
  const { socket } = yield select((state) => state.socket);
  const { roomId, myIdx, players } = yield select((state) => state.control);
  yield put({ type: INIT_ROLLBACK_REQUEST });

  const color = players[myIdx].isFirst ? -1 : 1;
  socket.emit('approveRollback', { roomId, color });
}

function* declineRollbackSaga() {
  const { socket } = yield select((state) => state.socket);
  const { roomId } = yield select((state) => state.control);
  yield put({ type: INIT_ROLLBACK_REQUEST });
  socket.emit('declineRollback', { roomId });
}

function* surrenderSaga() {
  const { socket } = yield select((state) => state.socket);
  const { roomId, myIdx } = yield select((state) => state.control);
  socket.emit('surrender', { roomId, loserIdx: myIdx });
}

export function* controlSaga() {
  yield takeLatest(JOIN_ROOM, joinRoomSaga);
  yield takeLatest(LEAVE_ROOM, leaveRoomSaga);
  yield takeLatest(SEND_MESSAGE, sendMessageSaga);
  yield takeEvery(TOGGLE_READY, toggleReadySaga);
  yield takeLatest(REQUEST_START_GAME, startGameSaga);
  yield takeLatest(REQUEST_SURRENDER, surrenderSaga);
  yield takeLatest(REQUEST_ROLLBACK, rollbackSaga);
  yield takeLatest(APPROVE_ROLLBACK, approveRollbackSaga);
  yield takeLatest(DECLINE_ROLLBACK, declineRollbackSaga);
}

const initialState = {
  isJoined: false,
  isOwner: null,
  roomId: null,
  players: [],
  myIdx: null,
  chatLog: [],
  chatInput: '',
  isStarted: false,
  turnIdx: null,
  isMyTurn: false,
  rollbackRequest: false,
  joinError: null,
};

function control(state = initialState, action) {
  switch (action.type) {
    case INITIALIZE: {
      return initialState;
    }
    case SET_ROOMID: {
      const { roomId } = action.payload;
      return {
        ...state,
        roomId,
      };
    }
    case JOIN_ROOM_SUCCESS: {
      const { title, players, isStarted, turnIdx, username } = action.payload;
      const myIdx = players.findIndex((player) => player.username === username);
      const { isOwner } = players[myIdx];
      return {
        ...state,
        isJoined: true,
        joinError: null,
        isOwner,
        title,
        players,
        isStarted,
        myIdx,
        turnIdx,
        isMyTurn: myIdx === turnIdx,
        chatLog: state.chatLog.concat({
          type: 'NOTICE',
          message: `- ${username}님이 접속하였습니다 -`,
        }),
      };
    }
    case JOIN_ROOM_FAILURE: {
      return {
        ...state,
        joinError: action.payload,
      };
    }
    case NEW_PLAYER: {
      const username = action.payload;
      return {
        ...state,
        players: state.players.concat({
          username,
          isReady: false,
        }),
        chatLog: state.chatLog.concat({
          type: 'NOTICE',
          message: `- ${username}님이 접속하였습니다 -`,
        }),
      };
    }
    case EXIT_USER: {
      const { players, exitUser } = action.payload;
      return {
        ...state,
        players: players,
        chatLog: state.chatLog.concat({
          type: 'NOTICE',
          message: `- ${exitUser}님이 나가셨습니다 -`,
        }),
        myIdx: 0,
        isOwner: true,
      };
    }
    case INIT_MESSAGE: {
      return {
        ...state,
        chatInput: '',
      };
    }
    case CHANGE_MESSAGE: {
      return {
        ...state,
        chatInput: action.payload,
      };
    }
    case UPDATE_MESSAGE: {
      const { username, isSelf, content } = action.payload;
      return {
        ...state,
        chatLog: state.chatLog.concat({
          type: 'CHAT',
          message: { username, isSelf, content },
        }),
      };
    }
    case UPDATE_READY: {
      return {
        ...state,
        players: state.players.map((player) =>
          player.username === action.payload
            ? { ...player, isReady: !player.isReady }
            : player
        ),
      };
    }
    case START_GAME: {
      const { turnIdx } = action.payload;
      return {
        ...state,
        isStarted: true,
        turnIdx,
        isMyTurn: state.myIdx === turnIdx,
        chatLog: state.chatLog.concat({
          type: 'NOTICE',
          message: '- 게임이 시작되었습니다 -',
        }),
      };
    }
    case END_GAME: {
      const { winnerIdx } = action.payload;
      return {
        ...state,
        isStarted: false,
        players: state.players.map((player) => ({
          ...player,
          isFirst: !player.isFirst,
          isReady: player.isOwner,
        })),
        turnIdx: null,
        chatLog: state.chatLog.concat({
          type: 'NOTICE',
          message: `- ${
            winnerIdx === state.myIdx ? '승리' : '패배'
          }하였습니다 -`,
        }),
      };
    }
    case UPDATE_TURN: {
      const turnIdx = action.payload;
      return {
        ...state,
        turnIdx,
        isMyTurn: turnIdx === state.myIdx,
      };
    }
    case GET_ROLLBACK_REQUEST: {
      return {
        ...state,
        rollbackRequest: true,
      };
    }
    case INIT_ROLLBACK_REQUEST: {
      return {
        ...state,
        rollbackRequest: false,
      };
    }
    // case APPROVE_ROLLBACK_REQUEST: {
    //   return {
    //     ...state,
    //     rollbackRequest: false,
    //   };
    // }
    // case DECLINE_ROLLBACK_REQUEST: {
    //   return {
    //     ...state,
    //     rollbackRequest: false,
    //   };
    // }
    default:
      return state;
  }
}

export default control;
