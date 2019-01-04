/* eslint-disable import/prefer-default-export */
import { call, put, takeEvery } from 'redux-saga/effects';
import { queryUserList } from '../services/home';

export function* fetchUserList() {
  try {
    const response = yield call(queryUserList);
    yield put({ type: 'usersSuccess', data: response.data.list || [] });
  } catch (error) {
    yield put({ type: 'usersFailure', err: error });
  }
}

export default [takeEvery('FETCH_USER_LIST', fetchUserList)];
