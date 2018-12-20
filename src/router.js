// 引入页面文件
const routes = {
  '/assets/foo': () => import('./views/foo'),
  '/assets/bar': () => import('./views/bar')
}

// Router 类，用来控制页面根据当前 URL 切换
class Router {
  start() {
    // 点击浏览器后退 / 前进按钮时会触发 window.onpopstate 事件，我们在这时切换到相应页面
    // https://developer.mozilla.org/en-US/docs/Web/Events/popstate
    window.addEventListener('popstate', () => {
      this.load(location.pathname)
    })

    // 打开页面时加载当前页面
    this.load(location.pathname)
  }

  // 前往 path，变更地址栏 URL，并加载相应页面
  go(path) {
    // 变更地址栏 URL
    history.pushState({}, '', path)
    // 加载页面
    this.load(path)
  }

  // 加载 path 路径的页面
  // 使用 async/await 语法
  async load(path) {
    // 首页
    if (path === '/assets/') path = '/assets/foo'
    // 动态加载页面
    const View = (await routes[path]()).default
    // 创建页面实例
    const view = new View()
    // 调用页面方法，把页面加载到 document.body 中
    view.mount(document.body)
  }
}

// 导出 router 实例
export default new Router()