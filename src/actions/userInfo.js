/* eslint-disable import/prefer-default-export */
import { call, put } from 'redux-saga/effects';
import { queryUser } from '../services/userInfo';

export function* fetchUser(action) {
  try {
    const response = yield call(queryUser, action.payload.id);
    yield put({
      type: 'USER_SUCCESS',
      userId: response.data.id,
      data: response.data
    });
  } catch (error) {
    yield put({ type: 'USER_FAILURE', err: error });
  }
}