const express = require('express')
const path = require('path')
const app = express()
const chalk = require('chalk')
const openBrowser = require('react-dev-utils/openBrowser')

// eslint-disable-next-line no-undef
if (!__DEV__) {
  app.use(express.static(path.resolve(process.cwd(), 'public')))
} else {
  const webpack = require('webpack')
  const webpackConfig = require('../webpack.config')
  const compiler = webpack(webpackConfig)

  compiler.apply(new webpack.ProgressPlugin())

  app.use(require('webpack-dev-middleware')(compiler, {
    // webpack-dev-middleware options
    // The public path that the middleware is bound to.
    // Best Practice: use the same publicPath defined in your webpack config.
    publicPath: webpackConfig.output.publicPath,
    headers: { 'Access-Control-Allow-Origin': '*' },
    hot: true,
    quiet: true,
    noInfo: true,
    stats: 'minimal',
    // index.html 存到本地，方便下一步返回
    writeToDisk: filePath => /index.html$/.test(filePath)
  }))

  app.use(
    require('webpack-hot-middleware')(compiler, {
      log: false
    })
  )
}

// 如果没有命中wdm，默认返回首页
app.use((req, res) => {
  res.sendFile(path.resolve(process.cwd(), 'public/index.html'))
})

/* eslint-disable no-console */
app.listen(3000, err => {
  const url = 'http://localhost:3000'

  if (err) console.error(chalk.red(`==> 😭  OMG!!! ${err}`))

  console.info(chalk.green(`==> 🌎  Listening at ${url}`))

  // Open browser
  if (openBrowser(url)) {
    console.info(chalk.green('==> 🖥️  Opened on your browser\'s tab!'))
  }
})
/* eslint-enable no-console */