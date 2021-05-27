import { all } from '@redux-saga/core/effects';
import { combineReducers } from 'redux';
import auth, { authSaga } from './auth';
import user, { userSaga } from './user';
import loading from './loading';

const rootReducer = combineReducers({ auth, user, loading });

export function* rootSaga() {
  yield all([authSaga(), userSaga()]);
}

export default rootReducer;
