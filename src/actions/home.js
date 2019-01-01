/* eslint-disable import/prefer-default-export */
import { call, put, takeEvery } from 'redux-saga/effects';
import { queryUserList } from '../services/home';

export function* fetchUserList() {
  try {
    const response = yield call(queryUserList);
    yield put({ type: 'USERS_SUCCESS', data: response.data.list || [] });
  } catch (error) {
    yield put({ type: 'USERS_FAILURE', err: error });
  }
}

function* watchFetchData() {
  yield takeEvery('FETCH_USER_LIST', fetchUserList);
}

export default [watchFetchData()];
