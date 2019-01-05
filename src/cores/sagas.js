import { all } from 'redux-saga/effects';
import home from '../models/home';
import userInfo from '../models/userInfo';
import { modelToEffect } from '../utils/reduce';

const sagas = [...modelToEffect(home), ...modelToEffect(userInfo)];

// https://github.com/redux-saga/redux-saga/blob/master/docs/advanced/RootSaga.md
export default function* rootSaga() {
  // add your saga here
  yield all(sagas);
}
