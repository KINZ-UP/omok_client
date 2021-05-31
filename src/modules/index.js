import { all } from '@redux-saga/core/effects';
import { combineReducers } from 'redux';
import auth, { authSaga } from './auth';
import user, { userSaga } from './user';
import loading from './loading';
import create from './create';
import room, { roomSaga } from './room';
import board, { boardSaga } from './board';

const rootReducer = combineReducers({
  auth,
  user,
  loading,
  create,
  room,
  board,
});

export function* rootSaga() {
  yield all([authSaga(), userSaga(), roomSaga(), boardSaga()]);
}

export default rootReducer;
