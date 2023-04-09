const express = require('express');
const path = require('path');
const chalk = require('chalk');
const childProcess = require('child_process');
const webpack = require('webpack');
const serverWebpack = require('./webpack.server');
const clientWebpack = require('./webpack.client');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');

// dev模式webpack配置修改
serverWebpack.mode = 'development';
serverWebpack.entry = './src/index.ssr.dev.tsx';
clientWebpack.mode = 'development';

// 实现浏览器自动更新
clientWebpack.plugins.push(new webpack.HotModuleReplacementPlugin());
clientWebpack.plugins.push(new webpack.NoEmitOnErrorsPlugin());
clientWebpack.entry = ['webpack-hot-middleware/client', './src/index.tsx'];

function createMiddleware(compiler, config) {
  return webpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath,
    // quiet: true, //向控制台显示任何内容
    // hot: true,
    // stats: {},
    // logLevel: 'error',
  });
}

function createHotMiddleware(compiler, path) {
  return webpackHotMiddleware(compiler, {
    log: false,
    heartbeat: 2000,
    path,
  });
}

const serverCompiler = webpack(serverWebpack);
const clientCompiler = webpack(clientWebpack);
const middleware = createMiddleware(serverCompiler, serverWebpack);
const hotMiddleware = createHotMiddleware(serverCompiler, '/server/__webpack_hmr');
const clientMiddleware = createMiddleware(clientCompiler, clientWebpack);
const clientHotMiddleware = createHotMiddleware(clientCompiler, '/client/__webpack_hmr');


const app = express();
let PORT = 8083;
let STARTED = false;
// app.use( '/', express.static(path.join(__dirname, '../resource'), {index: false}));
// // 接口代理转发，解决接口跨域问题
// proxy(app);
app.use(middleware);
app.use(hotMiddleware);
app.use(clientMiddleware);
app.use(clientHotMiddleware);


app.use(function (req, res, next) {

  const htmlFileName = path.join(clientCompiler.outputPath, '../index.html');

  const serverFileName = path.join(serverCompiler.outputPath, './bundle.js');

  clientCompiler.outputFileSystem.readFile(htmlFileName, function (err, result1) {
    if (err) {
      return next(err);
    }
    const htmlFileStr = result1.toString();
    serverCompiler.outputFileSystem.readFile(serverFileName, function (err, result2) {
      if (err) {
        return next(err);
      }
      const serverFileStr = result2.toString();
      eval(serverFileStr);
      const contentHtml = global.rtnRootHtmlContent(req.path);
      res.set('content-type', 'text/event-stream');
      res.send(htmlFileStr.replace('<!-- CONTENT -->',contentHtml));
      res.end();
    });
  });

});

function startExpress() {
  app.listen(PORT, function () {
    STARTED = true;
    console.log('成功启动：' + chalk.blueBright(`http://localhost:${PORT}`));
    childProcess.exec(`start http://localhost:${PORT}`);
  }).on('error', function (err) {
    if (err.message.includes('address already in use')) {
      PORT++;
      startExpress();
    } else {
      console.log(err)
    }
  });
}

clientCompiler.hooks.done.tap('server start', () => {
  console.log('-----代码修改热更新-----')
  if (!STARTED) {
    startExpress();
  }
});