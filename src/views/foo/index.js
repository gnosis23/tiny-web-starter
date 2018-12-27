import React from 'react';
import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./Foo'),
  loading: () => <div>loading...</div>
});
