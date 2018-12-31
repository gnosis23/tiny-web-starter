import { takeEvery, all } from 'redux-saga/effects';
import { fetchUserList } from './home';
import { fetchUser } from './userInfo';

function* watchFetchData() {
  yield takeEvery('FETCH_USER_LIST', fetchUserList);
}

function* watchFetchUser() {
  yield takeEvery('FETCH_USER', fetchUser);
}

export default function* rootSaga() {
  yield all([watchFetchData(), watchFetchUser()]);
}
