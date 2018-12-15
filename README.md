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

### html-webpack-plugin
Webpack 一般打包生成一个 js 文件。这个插件可以生成一个 HTML 文件，bundles 文件会被自动添加到 `script`  中。


可以指定一个 `template` 模板路径；例如 `index.html`，注意需要对应的 `html-loader`

### webpack-dev-server


## 使用方式
```bash
npm install

# 开发
npm run dev

# 打包
npm run build
```

