const webpack = require('webpack');
const { resolve } = require('path');
const ManifestPlugin = require('webpack-manifest-plugin');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const ImageminPlugin = require('imagemin-webpack-plugin').default;
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

const nodeEnv = process.env.NODE_ENV || 'development';
const isDev = nodeEnv === 'development';

// Enable/disable css modules here
const USE_CSS_MODULES = true;

// Setup the plugins for development/production
const getPlugins = () => {
  // Common
  const plugins = [
    new ManifestPlugin({
      fileName: path.resolve(process.cwd(), 'public/webpack-assets.json'),
      filter: file => file.isInitial
    }),
    /*
    html-webpack-plugin 用来打包入口 html 文件
    entry 配置的入口是 js 文件，webpack 以 js 文件为入口，遇到 import, 用配置的 loader 加载引入文件
    但作为浏览器打开的入口 html, 是引用入口 js 的文件，它在整个编译过程的外面，
    所以，我们需要 html-webpack-plugin 来打包作为入口的 html 文件
    */
    new HtmlWebpackPlugin({
      /*
      template 参数指定入口 html 文件路径，插件会把这个文件交给 webpack 去编译，
      webpack 按照正常流程，找到 loaders 中 test 条件匹配的 loader 来编译，那么这里 html-loader 就是
      匹配的 loader
      html-loader 编译后产生的字符串，会由 html-webpack-plugin 储存为 html 文件到输出目录，默认文件名
      为 index.html
      可以通过 filename 参数指定输出的文件名
      html-webpack-plugin 也可以不指定 template 参数，它会使用默认的 html 模板。
      */
      template: './src/index.html',

      /*
      因为和 webpack 4 的兼容性问题，chunksSortMode 参数需要设置为 none
      https://github.com/jantimon/html-webpack-plugin/issues/870
      */
      chunksSortMode: 'none'
    }),

    new MiniCssExtractPlugin({
      // Don't use hash in development, we need the persistent for "renderHtml.js"
      filename: isDev ? '[name].css' : '[name].[contenthash:8].css',
      chunkFilename: isDev ? '[id].chunk.css' : '[id].[contenthash:8].chunk.css'
    }),

    new webpack.DefinePlugin({
      __DEV__: JSON.stringify(isDev)
    })
  ];

  if (isDev) {
    // Development
    plugins.push(
      new webpack.HotModuleReplacementPlugin(),
      new FriendlyErrorsWebpackPlugin()
    );
  } else {
    plugins.push(
      /*
      使用文件路径的 hash 作为 moduleId。
      虽然我们使用 [chunkhash] 作为 chunk 的输出名，但仍然不够。
      因为 chunk 内部的每个 module 都有一个 id，webpack 默认使用递增的数字作为 moduleId。
      如果引入了一个新文件或删掉一个文件，可能会导致其他文件的 moduleId 也发生改变，
      那么受影响的 module 所在的 chunk 的 [chunkhash] 就会发生改变，导致缓存失效。
      因此使用文件路径的 hash 作为 moduleId 来避免这个问题。
      */
      new webpack.HashedModuleIdsPlugin(),
      new CompressionPlugin({
        test: /\.jsx?$|\.css$|\.less$|\.html$/,
        threshold: 10240
      }),
      // Minimizing style for production
      new OptimizeCssAssetsPlugin(),
      // Plugin to compress images with imagemin
      // Check "https://github.com/Klathmon/imagemin-webpack-plugin" for more configurations
      new ImageminPlugin({
        pngquant: { quality: '95-100' }
      }),
      // Visualize all of the webpack bundles
      // Check "https://github.com/webpack-contrib/webpack-bundle-analyzer#options-for-plugin"
      // for more configurations
      new BundleAnalyzerPlugin({
        analyzerMode: process.env.NODE_ENV === 'analyze' ? 'server' : 'disabled'
      })
    );
  }

  return plugins;
};

const getEntry = () => {
  // Development
  let entry = ['webpack-hot-middleware/client?reload=true', './src/index.js'];

  // Prodcution
  if (!isDev) entry = ['./src/index.js'];

  return entry;
};

module.exports = {
  /*
  webpack 执行模式
  development：开发环境，它会在配置文件中插入调试相关的选项，比如 moduleId 使用文件路径方便调试
  production：生产环境，webpack 会将代码做压缩等优化
  */
  mode: isDev ? 'development' : 'production',

  /*
  配置 source map
  开发模式下使用 cheap-module-eval-source-map, 生成的 source map 能和源码每行对应，方便打断点调试
  生产模式下使用 hidden-source-map, 生成独立的 source map 文件，并且不在 js 文件中插入 source map
  路径，
  用于在 error report 工具中查看 （比如 Sentry)
  */
  devtool: isDev ? 'cheap-module-eval-source-map' : 'hidden-source-map',

  // 配置页面入口 js 文件
  entry: getEntry(),

  // 配置打包输出相关
  output: {
    // 打包输出目录
    path: path.resolve(process.cwd(), 'public'),
    // 在服务器上访问打包文件所需的路径，通常结尾带斜杠
    publicPath: '/',

    // 入口 js 的打包输出文件名
    // Don't use chunkhash in development it will increse compilation time
    filename: isDev ? '[name].js' : '[name].[chunkhash:8].js',

    /*
    代码中引用的文件（js、css、图片等）会根据配置合并为一个或多个包，我们称一个包为 chunk。
    每个 chunk 包含多个 modules。无论是否是 js，webpack 都将引入的文件视为一个 module。
    chunkFilename 用来配置这个 chunk 输出的文件名。

    [chunkhash]：这个 chunk 的 hash 值，文件发生变化时该值也会变。使用 [chunkhash] 作为文件名可以
    防止浏览器读取旧的缓存文件。

    还有一个占位符 [id]，编译时每个 chunk 会有一个id。
    我们在这里不使用它，因为这个 id 是个递增的数字，增加或减少一个chunk，都可能导致其他 chunk 的 id
    发生改变，导致缓存失效。
    */
    chunkFilename: isDev ? '[id].chunk.js' : '[id].[chunkhash:8].chunk.js',
    pathinfo: isDev
  },

  // 目录别名
  resolve: {
    alias: {
      '~': resolve(__dirname, 'src')
    }
  },

  module: {
    /*
    配置各种类型文件的加载器，称之为 loader
    webpack 当遇到 import ... 时，会调用这里配置的 loader 对引用的文件进行编译
    */
    rules: [
      {
        /*
        使用 babel 编译 ES6 / ES7 / ES8 为 ES5 代码
        使用正则表达式匹配后缀名为 .js 的文件
        */
        test: /\.js$/,

        // 排除 node_modules 目录下的文件，npm 安装的包不需要编译
        exclude: /node_modules/,

        /*
        use 指定该文件的 loader, 值可以是字符串或者数组。
        这里先使用 eslint-loader 处理，返回的结果交给 babel-loader 处理。loader 的处理顺序是从最后
        一个到第一个。
        eslint-loader 用来检查代码，如果有错误，编译的时候会报错。
        babel-loader 用来编译 js 文件。
        */
        use: ['babel-loader']
      },

      {
        // 匹配 html 文件
        test: /\.html$/,
        /*
        使用 html-loader, 将 html 内容存为 js 字符串，比如当遇到
        import htmlString from './template.html';
        template.html 的文件内容会被转成一个 js 字符串，合并到 js 文件里。
        */
        use: 'html-loader'
      },

      {
        // 匹配 css 文件
        test: /\.css$/,
        use: [
          'css-hot-loader',
          // This plugin extracts CSS into separate files. It creates a CSS file
          // per JS file which contains CSS.
          MiniCssExtractPlugin.loader,
          // css-loader 将 css 内容存为 js 字符串，并且会把 background, @font-face 等引用的图片，
          // 字体文件交给指定的 loader 打包，类似上面的 html-loader, 用什么 loader 同样在 loaders 对象
          // 中定义，等会下面就会看到。
          {
            loader: 'css-loader',
            options: {
              // The option importLoaders allows you to configure how many loaders before
              // css-loader should be applied to @imported resources.
              // 0 => no loaders (default); 1 => postcss-loader
              // 2 => postcss-loader, sass-loader
              importLoaders: 1,
              modules: USE_CSS_MODULES,
              // class 编译后的名称
              localIdentName: '[name]__[local]___[hash:base64:5]',
              context: path.resolve(process.cwd(), 'src'),
              sourceMap: true
            }
          },
          // postcss-loader 相当于 css 的 babel-loader
          { loader: 'postcss-loader', options: { sourceMap: true } }
        ]
      },

      {
        test: /\.less$/,
        use: [
          'css-hot-loader',
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2,
              modules: USE_CSS_MODULES,
              localIdentName: '[name]__[local]___[hash:base64:5]',
              context: path.resolve(process.cwd(), 'src'),
              sourceMap: true
            }
          },
          { loader: 'postcss-loader', options: { sourceMap: true } },
          {
            loader: 'less-loader',
            options: {
              sourceMap: true
            }
          }
        ]
      },

      {
        /*
        匹配各种格式的图片和字体文件
        上面 html-loader 会把 html 中 <img> 标签的图片解析出来，文件名匹配到这里的 test 的正则表达式，
        css-loader 引用的图片和字体同样会匹配到这里的 test 条件
        */
        test: /\.(png|jpg|jpeg|gif|eot|ttf|woff|woff2|svg|svgz)(\?.+)?$/,

        /*
        使用 url-loader, 它接受一个 limit 参数，单位为字节(byte)

        当文件体积小于 limit 时，url-loader 把文件转为 Data URI 的格式内联到引用的地方
        当文件大于 limit 时，url-loader 会调用 file-loader, 把文件储存到输出目录，并把引用的文件路径
        改写成输出后的路径

        比如 views/foo/index.html 中
        <img src="smallpic.png">
        会被编译成
        <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAA...">

        而
        <img src="largepic.png">
        会被编译成
        <img src="/f78661bef717cf2cc2c2e5158f196384.png">
        */
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10240,
              name: '[name].[hash:8].[ext]'
            }
          }
        ]
      }
    ]
  },

  /*
  配置 webpack 插件
  plugin 和 loader 的区别是，loader 是在 import 时根据不同的文件名，匹配不同的 loader 对这个文件做处理，
  而 plugin, 关注的不是文件的格式，而是在编译的各个阶段，会触发不同的事件，让你可以干预每个编译阶段。
  */
  plugins: getPlugins(),

  optimization: {
    /*
    上面提到 chunkFilename 指定了 chunk 打包输出的名字，那么文件名存在哪里了呢？
    它就存在引用它的文件中。这意味着一个 chunk 文件名发生改变，会导致引用这个 chunk 文件也发生改变。

    runtimeChunk 设置为 true, webpack 就会把 chunk 文件名全部存到一个单独的 chunk 中，
    这样更新一个文件只会影响到它所在的 chunk 和 runtimeChunk，避免了引用这个 chunk 的文件也发生改变。
    */
    runtimeChunk: true,

    splitChunks: {
      /*
      默认 entry 的 chunk 不会被拆分
      因为我们使用了 html-webpack-plugin 来动态插入 <script> 标签，entry 被拆成多个 chunk 也能自动被插入到 html 中，
      所以我们可以配置成 all, 把 entry chunk 也拆分了
      */
      chunks: isDev ? 'async' : 'all'
    }
  },

  /*
  配置开发时用的服务器，让你可以用 http://127.0.0.1:8080/ 这样的 url 打开页面来调试
  并且带有热更新的功能，打代码时保存一下文件，浏览器会自动刷新。比 nginx 方便很多
  如果是修改 css, 甚至不需要刷新页面，直接生效。这让像弹框这种需要点击交互后才会出来的东西调试起来
  方便很多。

  因为 webpack-cli 无法正确识别 serve 选项，使用 webpack-cli 执行打包时会报错。
  因此我们在这里判断一下，仅当使用 webpack-serve 时插入 serve 选项。
  issue：https://github.com/webpack-contrib/webpack-serve/issues/19
  */
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 8080
  }
};
