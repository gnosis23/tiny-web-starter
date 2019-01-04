/**
 * 将 model 转换为 reducer
 */
export function modelToReducer(model) {
  const { reducers, state } = model;
  const initial = { ...state };
  return (currentState = initial, action) => {
    const reducer = reducers[action.type];
    return reducer ? reducer(currentState, action) : state;
  };
}

export function modelToEffect() {
  return 0;
}
