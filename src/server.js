const express = require('express')
const app = express()

// eslint-disable-next-line no-undef
if (!__DEV__) {
  const webpack = require('webpack')
  const webpackConfig = require('../webpack.config')
  const compiler = webpack(webpackConfig)

  app.use(require('webpack-dev-middleware')(compiler, {
    // webpack-dev-middleware options
    // The public path that the middleware is bound to.
    // Best Practice: use the same publicPath defined in your webpack config.
    publicPath: webpackConfig.output.publicPath,
    headers: { 'Access-Control-Allow-Origin': '*' },
    hot: true,
    quiet: true
  }))
}

app.listen(3000, () => console.log('Example app listening on port 3000!'))