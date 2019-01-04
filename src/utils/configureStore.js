import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'connected-react-router';
import createSagaMiddleware from 'redux-saga';

import createRootReducer from '../cores/reducer';
import rootSaga from '../actions';

const sagaMiddleware = createSagaMiddleware();

export default (history, initialState = {}) => {
  const middlewares = [
    routerMiddleware(history),
    // Add other middlewares here
    sagaMiddleware
  ];

  // Use Redux DevTools Extension in development
  const composeEnhancers =
    (__DEV__ &&
      typeof window !== 'undefined' &&
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
    compose;
  const enhancers = composeEnhancers(
    applyMiddleware(...middlewares)
    // Add other enhancers here
  );
  const store = createStore(
    createRootReducer(history),
    initialState,
    enhancers
  );

  if (module.hot) {
    // Enable webpack hot module replacement for reducers
    module.hot.accept('../cores/reducer', () => {
      try {
        const createNextReducer = require('../cores/reducer').default;

        store.replaceReducer(createNextReducer(history));
      } catch (error) {
        console.error(`==>  Reducer hot reloading error ${error}`);
      }
    });
  }

  sagaMiddleware.run(rootSaga);
  return store;
};
