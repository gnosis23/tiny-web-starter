import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { modelToReducer } from '../utils/reduce';
import home from '../models/home';
import userInfo from '../models/userInfo';

// add model here
const reducers = {
  home: modelToReducer(home),
  userInfo: modelToReducer(userInfo)
};

export default history =>
  combineReducers({
    router: connectRouter(history),
    ...reducers
  });
