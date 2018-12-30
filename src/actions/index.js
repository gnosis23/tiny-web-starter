import { takeEvery } from 'redux-saga/effects';
import { fetchUserList } from './home';

function* watchFetchData() {
  yield takeEvery('FETCH_USER_LIST', fetchUserList);
}

export default function* rootSaga() {
  yield [watchFetchData()];
}
