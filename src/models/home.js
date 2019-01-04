export default {
  state: {
    readyStatus: 'USERS_INVALID',
    err: null,
    list: []
  },
  reducers: {
    usersRequesting(state) {
      return { ...state, readyStatus: 'USERS_REQUESTING' };
    },
    usersFailure(state, action) {
      return {
        ...state,
        readyStatus: 'USERS_FAILURE',
        err: action.err
      };
    },
    usersSuccess(state, action) {
      return {
        ...state,
        readyStatus: 'USERS_SUCCESS',
        list: action.data
      };
    }
  }
};
