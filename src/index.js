// 将 async/await 转换成 ES5 代码后需要这个运行时库来支持
import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { createBrowserHistory } from 'history';
import { AppContainer } from 'react-hot-loader';
import { Provider } from 'react-redux';
import {
  ConnectedRouter,
  routerMiddleware,
  connectRouter
} from 'connected-react-router';
import { create } from 'dva-core';
import routes from './common/router';
import models from './models';

const history = createBrowserHistory();
const app = create({
  extraReducers: {
    router: connectRouter(history)
  },
  onAction: routerMiddleware(history)
});
models.forEach(model => {
  app.model(model);
});
app.start();

const store = app._store;

const render = Routes => {
  ReactDOM.render(
    <AppContainer>
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <Routes />
        </ConnectedRouter>
      </Provider>
    </AppContainer>,
    document.getElementById('root')
  );
};

render(routes);

if (module.hot) {
  // Enable webpack hot module replacement for routes
  try {
    const nextRoutes = require('./common/router').default;

    render(nextRoutes);
  } catch (error) {
    console.error(`==> Routes hot reloading error ${error}`);
  }
}
