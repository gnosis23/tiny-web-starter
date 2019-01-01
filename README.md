# React + Redux Starter Project

一款基于 Webpack 4，React 全家桶的初始模板项目

## Features
包含了如下技术：

* React
* React Router v4
* Redux
* Redux-saga 异步操作
* Webpack 4
* Babel
* React Hot Loader 热模块替换
* react-loader 代码切割
* Webpack Dev Middleware 类似于 dev-server，需要自己的 server
* ESLint

## 面向用户
不想折腾 Webpack 配置的人

## 环境需求
node >= 10.0

## 使用方式
```bash
npm install

# 开发
npm run dev

# 打包
npm run build
npm run start
```

## 目录结构
以下为文件目录结构
```
.
├── public                          # 打包输出路径
├── src                             # App source code
│   ├── actions                     # Redux actions
│   ├── assets                      # 一些图片资源
│   ├── common                      # 核心逻辑等
│   ├── components                  # 组件
│   ├── pages                       # 页面
│   ├── reducers                    # Redux reducers
│   ├── services                    # 远程请求接口
│   ├── theme                       # App-wide style and vendor CSS framework
│   ├── utils                       # 工具类
│   ├── index.js                    # 客户端
│   ├── router.config.js            # 路由配置文件
│   └── server.js                   # Express server (with webpack dev/hot middlewares)
├── index.js                        # App entry point
```

## 使用文档

### 添加路由
将路径和对应的页面文件添加到如下文件中。

```js
// router.config.js
export default {
  // 路由地址
  '/home': {
    loader: () => import('./pages/Home') // 路由文件
  }
};
```

> 路径会匹配最短的那个？需要更好的处理方式

### 发起远程请求
用 `Redux-saga` 发起一个远程请求算是简单的了...

1. 在 services 下建立请求接口
```js
// services/home.js
import request from '../utils/request';

export async function queryUserList() {
  return request('/api/home/userList');
}
```

2. 在 actions 下建立请求方法
```js
// actions/home.js
import { call, put, takeEvery } from 'redux-saga/effects';
import { queryUserList } from '../services/home';

export function* fetchUserList() {
  try {
    const response = yield call(queryUserList);
    yield put({ type: 'USERS_SUCCESS', data: response.data.list || [] });
  } catch (error) {
    yield put({ type: 'USERS_FAILURE', err: error });
  }
}

function* watchFetchData() {
  yield takeEvery('FETCH_USER_LIST', fetchUserList);
}

export default [watchFetchData()];
```

3. 将监听请求注册到 rootSaga 下
```js
// actions/index.js
import { all } from 'redux-saga/effects';
import homeSagas from './home';
import userInfoSaga from './userInfo';

export default function* rootSaga() {
  // add your saga here
  yield all([...homeSagas, ...userInfoSaga]);
}
```

4. 在 Redux 里添加处理代码
```js
// reducers/home.js
import _ from 'lodash';

const initialState = {
  readyStatus: 'USERS_INVALID',
  err: null,
  list: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'USERS_REQUESTING':
      return _.assign({}, state, {
        readyStatus: 'USERS_REQUESTING'
      });
    case 'USERS_FAILURE':
      return _.assign({}, state, {
        readyStatus: 'USERS_FAILURE',
        err: action.err
      });
    case 'USERS_SUCCESS':
      return _.assign({}, state, {
        readyStatus: 'USERS_SUCCESS',
        list: action.data
      });
    default:
      return state;
  }
};
```

5. 发起请求
```js
dispatch({ type: 'FETCH_USER_LIST' })
```

> 注册 rootSaga 这一步还是麻烦，想想办法

