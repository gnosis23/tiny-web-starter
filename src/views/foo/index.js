import React from 'react';
// 引入 router
// import router from '~/router'

// 引入 css, 会生成 <style> 块插入到 <head> 头中
import './style.css';
import smallpic from './smallpic.png';
import largepic from './largepic.png';

// 导出类
// export default class {
//   mount(container) {
//     document.title = 'foo'
//     container.innerHTML = template
//     container.querySelector('.foo__gobar').addEventListener('click', () => {
//       // 调用 router.go 方法加载 /bar 页面
//       router.go('/bar')
//     })
//   }
// }

// eslint-disable-next-line react/prefer-stateless-function
export default class Foo extends React.Component {
  render() {
    return (
      <div className="foo">
        <h1>Page Foo</h1>
        <a href="/bar" className="foo__gobar">
          goto /bar
        </a>

        <p>
          <img src={smallpic} alt="" />
        </p>

        <p>
          <img src={largepic} alt="" />
        </p>
      </div>
    );
  }
}
