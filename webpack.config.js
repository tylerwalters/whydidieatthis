'use strict';

var webpack = require('webpack');
var path = require('path');

module.exports = (function makeWebpackConfig () {
  var config = {};

  config.entry = {
    app: './src/app/app.js'
  };

  config.output = {
    path: path.join(__dirname, 'dist'),
    publicPath: './wp-content/themes/whydidieatthis/dist/',
    filename: '[name].bundle.js'
  };

  config.resolve = {
    modulesDirectories: [
      'node_modules',
      'src/public/views'
    ]
  };

  config.module = {
    preLoaders: [],
    loaders: [{
      test: /\.js$/,
      loaders: ['ng-annotate', 'babel'],
      exclude: /node_modules/
    },
    {
      test: /\.scss$/,
      loaders: ['style', 'css', 'sass']
    },
    {
      test: /\.(woff|woff2|ttf|eot)$/,
      loader: 'file?name=[name].[ext]'
    },
    {
      test: /\.(png|jpg|jpeg|gif|svg)$/,
      loader: 'file?name=public/images/[name].[ext]'
    },
    {
      test: /\.html$/,
      loader: 'ngtemplate?relativeTo=' + (path.resolve(__dirname, './src')) + '/!html',
      exclude: /index\.html/
    }]
  };

  config.plugins = [];

  return config;
}());