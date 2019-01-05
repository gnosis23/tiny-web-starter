# React Starter Project Powered by dva-core

一个基于 Webpack 4 构建、dva-core 状态管理的 React 模板项目。

## Features
包含了如下技术：

* React
* React Router v4：路由选项不多
* [dva-core](https://github.com/sorrycc/blog/issues/48)：封装了 model 的概念，极大地减少了代码量
* Webpack 4
* Babel
* React Hot Loader 热模块替换
* react-loader 代码切割
* Webpack Dev Middleware：类似于 dev-server，需要自己的 server
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
│   ├── assets                      # 一些图片资源
│   ├── common                      # 核心逻辑等
│   ├── components                  # 组件
│   ├── models                      # model
│   ├── pages                       # 页面
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

2. 在 models 中的 `effects` 下建立请求方法，[详细接口](https://dvajs.com/api/#reducers)

```js
// models/home.js
import { queryUserList } from '../services/home';

export default {
  namespace: 'home',
  state: {
    readyStatus: 'USERS_INVALID',
    err: null,
    list: []
  },
  reducers: {
    usersRequesting(state) {
      return { ...state, readyStatus: 'USERS_REQUESTING' };
    },
    usersFailure(state, action) {
      return {
        ...state,
        readyStatus: 'USERS_FAILURE',
        err: action.err
      };
    },
    usersSuccess(state, action) {
      return {
        ...state,
        readyStatus: 'USERS_SUCCESS',
        list: action.data
      };
    }
  },
  effects: {
    *fetchUserList(action, { call, put }) {
      try {
        const response = yield call(queryUserList);
        yield put({ type: 'usersSuccess', data: response.data.list || [] });
      } catch (error) {
        yield put({ type: 'usersFailure', err: error });
      }
    }
  }
};

```

3. 将 model 注册到 index 下
```js
// models/index.js
import home from './home';
import userInfo from './userInfo';

// add model here
export default [ home, userInfo ];
```

4. 发起请求
```js
dispatch({ type: 'home/fetchUserList' })
```
