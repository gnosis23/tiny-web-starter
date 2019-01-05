import { queryUser } from '../services/userInfo';

export default {
  state: {},
  reducers: {
    userRequesting(state, action) {
      return {
        ...state,
        [action.userId]: {
          readyStatus: 'USER_REQUESTING'
        }
      };
    },
    userFailure(state, action) {
      return {
        ...state,
        [action.userId]: {
          readyStatus: 'USER_FAILURE',
          err: action.err
        }
      };
    },
    userSuccess(state, action) {
      return {
        ...state,
        [action.userId]: {
          readyStatus: 'USER_SUCCESS',
          info: action.data
        }
      };
    }
  },
  effects: {
    *fetchUser(action, { call, put }) {
      try {
        const response = yield call(queryUser, action.payload.id);
        yield put({
          type: 'userSuccess',
          userId: response.data.id,
          data: response.data
        });
      } catch (error) {
        yield put({ type: 'userFailure', err: error });
      }
    }
  }
};
