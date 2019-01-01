// 将 async/await 转换成 ES5 代码后需要这个运行时库来支持
import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { createBrowserHistory } from 'history';
import { AppContainer } from 'react-hot-loader';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import routes from './common/router';
import configureStore from './utils/configureStore';

const history = createBrowserHistory();
// Get the initial state from server-side rendering
// const initialState = {};
const store = configureStore(history);

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
