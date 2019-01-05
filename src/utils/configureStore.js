import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import createSagaMiddleware from 'redux-saga';
import { modelToEffect, modelToReducer } from './reduce';
import modelMap from '../models';

const reducers = Object.keys(modelMap).reduce((acc, modelName) => {
  acc[modelName] = modelToReducer(modelMap[modelName]);
  return acc;
}, {});

const sagas = Object.values(modelMap).reduce(
  (acc, model) => acc.concat(modelToEffect(model)),
  []
);

const createRootReducer = history =>
  combineReducers({
    router: connectRouter(history),
    ...reducers
  });

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

  sagas.forEach(sagaMiddleware.run);
  return store;
};
