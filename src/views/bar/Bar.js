import React from 'react';
import { Link } from 'react-router-dom';
import styles from './style.less';

// 导出类
// export default class {
//   mount(container) {
//     document.title = 'bar'
//     container.innerHTML = template
//     container.querySelector('.bar__gofoo').addEventListener('click', () => {
//       // 调用 router.go 方法加载 /foo 页面
//       router.go('/foo')
//     })

//     const div = document.createElement('div')
//     // eslint-disable-next-line no-console
//     console.log(styles)
//     div.setAttribute('class', styles.gaga)
//     div.innerHTML = 'hello world'
//     document.body.appendChild(div)
//   }
// }

// eslint-disable-next-line react/prefer-stateless-function
export default class Bar extends React.Component {
  render() {
    return (
      <div className="bar">
        <h1>Page Bar</h1>
        <Link to="/foo" className={styles.gaga}>
          goto /foo
        </Link>
      </div>
    );
  }
}
