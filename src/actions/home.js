/* eslint-disable import/prefer-default-export */
import { call, put } from 'redux-saga/effects';
import { queryUserList } from '../services/home';

export function* fetchUserList() {
  try {
    const data = yield call(queryUserList);
    yield put({ type: 'USERS_SUCCESS', data: data || [] });
  } catch (error) {
    yield put({ type: 'USERS_FAILURE', err: error });
  }
}
