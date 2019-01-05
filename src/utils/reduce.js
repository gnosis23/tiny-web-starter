import { takeEvery, take, call, put } from 'redux-saga/effects';

/**
 * 将 model 转换为 reducer
 */
export function modelToReducer(model) {
  const { reducers = {}, state } = model;
  const initial = { ...state };
  return (currentState = initial, action) => {
    const reducer = reducers[action.type];
    return reducer ? reducer(currentState, action) : state;
  };
}

export function modelToEffect(model) {
  const { effects = {} } = model;
  console.log(`register ${Object.keys(effects)}`);
  const sagas = Object.keys(effects).map(effect => {
    function* temp(action) {
      yield effects[effect].call(null, action, { take, call, put, takeEvery });
    }
    return takeEvery(effect, temp);
  });
  return sagas;
}
