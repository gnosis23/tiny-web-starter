export default {
  '/': {
    loader: () => import('./pages/Home')
  },
  '/home': {
    loader: () => import('./pages/Home')
  },
  '/UserInfo/:id': {
    loader: () => import('./pages/UserInfo')
  }
};
