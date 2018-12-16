# Simple webpack project
## 描述
简单粗暴的 webpack 入门项目应该具有如下特点：

* 插件要有相关的作用说明
* 区分调试和生成模式

## 插件说明
### file-loader
使用方式如下，在代码里加入如下所示代码，就能将文件输出到目标文件夹。
```js
import img from './file.png'
```

### [url-loader](https://www.npmjs.com/package/url-loader)
这个插件可以将文件转换为 Base64 URI，当然大小有限制。

比如一个图片很小，就可以转换成如下形式 `data:image/gif;base64,R0lGOD...`

太大的文件会退化为 `file-loader`

### [html-loader](https://www.npmjs.com/package/html-loader)
将文件保存为字符串
```js
import htmlString from './template.html';
```

### [css-loader](https://github.com/webpack-contrib/css-loader)
在 js 文件中操作 css 文件。 比如生成带 hash tag 的 css class。

```css
/* style.css */
.container {
  background: yellow;
}
```

```js
// 配置
{
  test: /\.css$/,
  use: [
    'style-loader',
    {
      loader: 'css-loader',
      options: {
        modules: true,
        importLoaders: 0,
        localIdentName: '[name]__[local]___[hash:base64:5]'
      }
    }
  ]
}

// 代码
import styles from './style.css';
div.setAttribute('class', styles.container);

// 将会生成
// <div class="style__container___3ao-g"></div>
```

### [postcss-loader](https://github.com/postcss/postcss)
相当于 css 的 babel-loader。

插件包含 autoprefix、postcss-modules...

### html-webpack-plugin
Webpack 一般打包生成一个 js 文件。这个插件可以生成一个 HTML 文件，bundles 文件会被自动添加到 `script`  中。


可以指定一个 `template` 模板路径；例如 `index.html`，注意需要对应的 `html-loader`

### [DefinePlugin](https://webpack.js.org/plugins/define-plugin/)
在打包时往代码中的变量进行替换

```js
new webpack.DefinePlugin({
  PRODUCTION: JSON.stringify(true),
  VERSION: JSON.stringify('5fa3b9'),
  BROWSER_SUPPORTS_HTML5: true,
  TWO: '1+1',
  'typeof window': JSON.stringify('object'),
  'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
});

// source code
console.log('Running App version ' + VERSION);
if(!BROWSER_SUPPORTS_HTML5) require('html5shiv');
```


### webpack-dev-server


## 使用方式
```bash
npm install

# 开发
npm run dev

# 打包
npm run build
```

