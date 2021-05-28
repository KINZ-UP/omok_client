import { all } from '@redux-saga/core/effects';
import { combineReducers } from 'redux';
import auth, { authSaga } from './auth';
import user, { userSaga } from './user';
import loading from './loading';
import create from './create';

const rootReducer = combineReducers({ auth, user, loading, create });

export function* rootSaga() {
  yield all([authSaga(), userSaga()]);
}

export default rootReducer;
