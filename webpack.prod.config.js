const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');
const autoprefixer = require('autoprefixer');

module.exports = {

  // For production build we want to extract CSS to stand-alone file
  // Provide `extractStyles` param and `bootstrap-loader` will handle it
  entry: [
    'bootstrap-loader/extractStyles',
    './app/startup/App',
  ],

  output: {
    path: path.join(__dirname, 'public', 'assets'),
    filename: 'app.js',
  },

  resolve: { extensions: ['', '.js', '.jsx'] },

  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
    }),
    new ExtractTextPlugin('app.css', { allChunks: true }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    }),
  ],

  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loaders: ['babel'],
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract(
          'style',
          'css?modules&importLoaders=1&localIdentName=[local]' +
          '!postcss'
        ),
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract(
          'style',
          'css?modules&importLoaders=2&localIdentName=[local]' +
          '!postcss' +
          '!sass'
        ),
      },
      {
        test: /\.(woff2?|ttf|eot|svg)$/,
        loaders: ['url?limit=10000'],
      },
      {
        test: /\.(png|jpg|gif)$/,
        loader: 'url?limit=25000',
      },
    ],
  },

  postcss: [autoprefixer],

};
