/* eslint no-console: 0 */

const express = require('express');
const bodyParser = require('body-parser');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const path = require('path');
const request = require('request');

const devBuildConfig = require('./webpack.dev.config');

const PORT = 4000;

const server = express();
const compiler = webpack(devBuildConfig);

server.use(webpackDevMiddleware(compiler, {
  publicPath: devBuildConfig.output.publicPath,
  hot: true,
  historyApiFallback: true,
  stats: {
    colors: true,
    hash: false,
    version: false,
    chunks: false,
    children: false,
  },
}));

server.use(webpackHotMiddleware(compiler));

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));

server.use('/', (req, res) => {
  switch (req.url) {
    case '/' :
    case '/dummyPage' : {
      res.sendFile(path.join(__dirname, 'app', 'markup', 'index-dev.html'));
      break;
    }

    case '/signon' : {
      // Redirect Ajax calls
      const url = `http://localhost:8081${req.url}`;
      request.post({ uri: url, json: req.body, headers: req.headers }).pipe(res);
      break;
    }

    default: {
      res.redirect('/');
    }
  }
});

server.listen(PORT, 'localhost', err => {
  if (err) console.log(`Error: ${err}`);
  console.log(`Webpack dev server is running on port ${PORT}`);
});
