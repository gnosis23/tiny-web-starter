// 将 async/await 转换成 ES5 代码后需要这个运行时库来支持
import 'babel-polyfill'
import router from './router'

if (DEBUG) {
  // eslint-disable-next-line no-console
  console.log('in debug mode')
}

router.start()
