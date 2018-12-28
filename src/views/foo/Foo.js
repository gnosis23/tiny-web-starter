import React from 'react';
import { Link } from 'react-router-dom';
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
        <Link to="/bar" className="foo__gobar">
          goto /bar
        </Link>

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