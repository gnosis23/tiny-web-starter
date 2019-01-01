import express from 'express';
import path from 'path';
import chalk from 'chalk';
import openBrowser from 'react-dev-utils/openBrowser';
import favicon from 'serve-favicon';

const app = express();

app.use(favicon(path.resolve(process.cwd(), 'src/assets/favicon.ico')));

// eslint-disable-next-line no-undef
if (!__DEV__) {
  app.use(express.static(path.resolve(process.cwd(), 'public')));
} else {
  const webpack = require('webpack');
  const webpackConfig = require('../webpack.config');
  const compiler = webpack(webpackConfig);

  compiler.apply(new webpack.ProgressPlugin());

  app.use(
    require('webpack-dev-middleware')(compiler, {
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
    })
  );

  app.use(
    require('webpack-hot-middleware')(compiler, {
      log: false
    })
  );
}

// add router here
app.get('/api/home/userList', (req, res) => {
  res.json({
    code: 0,
    message: 'ok',
    data: {
      list: [
        { id: 1, name: 'wang' },
        { id: 2, name: 'zhao' },
        { id: 3, name: 'qian' },
        { id: 4, name: 'sun' }
      ]
    }
  });
});

app.get('/api/home/user', (req, res) => {
  const id = req.query.id || 0;
  res.json({
    code: 0,
    message: 'ok',
    data: {
      id,
      name: 'wang',
      email: 'bj050323@gmail.com',
      phone: '4008123123'
    }
  });
});

// 如果没有命中wdm，默认返回首页
app.use((req, res) => {
  res.sendFile(path.resolve(process.cwd(), 'public/index.html'));
});

/* eslint-disable no-console */
app.listen(3000, err => {
  const url = 'http://localhost:3000';

  if (err) console.error(chalk.red(`==> 😭  OMG!!! ${err}`));

  console.info(chalk.green(`==> 🌎  Listening at ${url}`));

  // Open browser
  if (openBrowser(url)) {
    console.info(chalk.green("==> 🖥️  Opened on your browser's tab!"));
  }
});
/* eslint-enable no-console */
