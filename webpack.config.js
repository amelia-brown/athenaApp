var path = require('path');
var webpack = require('webpack');


const config = {
  entry: {
    bundle: ['./client/index.js'],
//    test: ['./client/test.js'],
  },
  output: {
    path: __dirname + '/public',
    filename: '[name].js',
    publicPath: '/public/'
  },
  quiet: true,
  devtool: 'source-map',
  devServer: {
    contentBase: path.resolve(__dirname, 'public'),
    historyApiFallback: true,
    hot: true,
    inline: true
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react', 'stage-0']
        }
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ]
};

module.exports = config;

console.log('config.devServer.contentBase ',config.devServer.contentBase);
