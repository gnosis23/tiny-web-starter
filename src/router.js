import React from 'react';
import { Switch, Route } from 'react-router-dom';
import asyncHome from './pages/Home';
import asyncUserInfo from './pages/UserInfo';

const AppRouter = () => (
  <Switch>
    <Route path="/" exact component={asyncHome} />
    <Route path="/home" component={asyncHome} />
    <Route path="/UserInfo/:id" component={asyncUserInfo} />
  </Switch>
);

export default AppRouter;
