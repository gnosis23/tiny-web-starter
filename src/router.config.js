import dynamic from './utils/dynamic';

export default [
  {
    path: '/',
    exact: true,
    component: dynamic({
      component: () => import('./pages/Home')
    })
  },
  {
    path: '/home',
    component: dynamic({
      component: () => import('./pages/Home')
    })
  },
  {
    path: '/UserInfo/:id',
    component: dynamic({
      component: () => import('./pages/UserInfo')
    })
  }
];
