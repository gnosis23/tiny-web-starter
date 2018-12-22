// 引入 router
import router from '~/router'

// 引入 html 模板，会被作为字符串引入
import template from './index.html'

// 导出类
export default class {
  mount(container) {
    document.title = '404'
    container.innerHTML = template
    container.querySelector('.bar').addEventListener('click', () => {
      // 调用 router.go 方法加载 /foo 页面
      router.go('/foo')
    })
    const div = document.createElement('div')
    div.innerHTML = '404'
    document.body.appendChild(div)
  }
}