var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: './client/index.js',
  output: { path: __dirname, filename: 'public/bundle.js' },
  module: {
    loaders: [
      {
        test: /.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react', 'stage-0']
        }
      }
    ]
  }
};