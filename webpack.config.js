'use strict'

const webpack = require('webpack')
const autoprefixer = require('autoprefixer')

module.exports = {
  devtool: 'eval-source-map',
  entry: { bundle: './src/main.js' },
  target: 'web',
  output: {
    path: './public',
    filename: '[name].js',
    publicPath: '/'
  },
  module: {
    loaders: [
      {
        loader: 'style-loader!css-loader!postcss-loader!sass-loader',
        test: /\.scss$/,
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel',
        include: __dirname,
        query: {
          plugins: ['transform-decorators-legacy', 'transform-class-properties'],
          presets: ['es2015', 'stage-0', 'react', 'react-hmre']
        }
      }
    ]
  },
  resolve: {
    extensions: ['', '.js'],
    modulesDirectories: ['./src', './tests', 'node_modules']
  },
  postcss: [autoprefixer({ browsers: ['last 2 versions'] })],
  plugins: [
    new webpack.ProvidePlugin({
      Promise: 'yaku',
      URLSearchParams: 'url-search-params',
      'window.fetch': 'exports?self.fetch!whatwg-fetch'
    })
  ],
  node: {
    fs: "empty"
  }
}