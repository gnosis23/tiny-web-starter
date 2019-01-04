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
  }
};
