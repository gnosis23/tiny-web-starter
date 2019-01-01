/**
 *
 * DON'T EDIT THIS FILE
 * EDIT src/router.config.js
 *
 */
import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Loadable from 'react-loadable';
import Loading from '../components/Loading';
import routeConfig from '../router.config';

const routeCache = {};

function dynamicWrapper({ loader }) {
  return Loadable({
    loader,
    loading: Loading
  });
}

function routerMaps() {
  const paths = Object.keys(routeConfig);
  const result = paths.map(path => {
    if (!routeCache[path]) {
      routeCache[path] = dynamicWrapper(routeConfig[path]);
    }
    return {
      path,
      component: routeCache[path]
    };
  });
  return result;
}

const AppRouter = () => {
  const maps = routerMaps();
  const routes = maps.map(x => (
    <Route
      key={x.path}
      path={x.path}
      component={x.component}
      exact={x.path === '/'}
    />
  ));

  return <Switch>{routes}</Switch>;
};

export default AppRouter;
