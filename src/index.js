// 将 async/await 转换成 ES5 代码后需要这个运行时库来支持
import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { createBrowserHistory } from 'history';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import AppRouter from './router';
import configureStore from './utils/configureStore';

const history = createBrowserHistory();
// Get the initial state from server-side rendering
// const initialState = {};
const store = configureStore(history);

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <AppRouter />
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
);
