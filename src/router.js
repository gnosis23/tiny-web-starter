import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Foo from './views/foo';
import Bar from './views/bar';

const AppRouter = () => (
  <Router>
    <div>
      <Route path="/" exact component={Foo} />
      <Route path="/foo" component={Foo} />
      <Route path="/bar" component={Bar} />
    </div>
  </Router>
);

export default AppRouter;
