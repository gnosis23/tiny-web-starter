import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Foo from './views/foo';
import Bar from './views/bar';

const AppRouter = () => (
  <Switch>
    <Route path="/" exact component={Foo} />
    <Route path="/foo" component={Foo} />
    <Route path="/bar" component={Bar} />
  </Switch>
);

export default AppRouter;
