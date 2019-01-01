import { all } from 'redux-saga/effects';
import homeSagas from './home';
import userInfoSaga from './userInfo';

// https://github.com/redux-saga/redux-saga/blob/master/docs/advanced/RootSaga.md
export default function* rootSaga() {
  // add your saga here
  yield all([...homeSagas, ...userInfoSaga]);
}
