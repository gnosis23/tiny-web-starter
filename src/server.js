const express = require('express')
const path = require('path')
const app = express()

// stupid spa router middleware
app.use(function (req, res, next) {
  const validSuffix = ['.js', '.css', '.png', '.jpg', '.jpeg', '.map', '.gz'];
  if (validSuffix.every(x => !req.url.endsWith(x))) {
    req.url = '/'
  }
  next()
})

// eslint-disable-next-line no-undef
if (!__DEV__) {
  app.use(express.static(path.resolve(process.cwd(), 'public')));
} else {
  const webpack = require('webpack')
  const webpackConfig = require('../webpack.config')
  const compiler = webpack(webpackConfig)

  compiler.apply(new webpack.ProgressPlugin());

  app.use(require('webpack-dev-middleware')(compiler, {
    // webpack-dev-middleware options
    // The public path that the middleware is bound to.
    // Best Practice: use the same publicPath defined in your webpack config.
    publicPath: webpackConfig.output.publicPath,
    headers: { 'Access-Control-Allow-Origin': '*' },
    hot: true,
    quiet: true,
    noInfo: true,
    stats: 'minimal'
  }))

  app.use(
    require('webpack-hot-middleware')(compiler, {
      log: console.log,
      path: '/__webpack_hmr',
      heartbeat: 10 * 1000
    })
  );
}

app.listen(3000, () => console.log('Example app listening on port 3000!'))