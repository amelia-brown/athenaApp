var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: {
    bundle: [path.resolve(__dirname, 'client', 'index.js'),
            'webpack/hot/dev-server',
            'webpack-dev-server/client?http://localhost:8080'],
    test: './test/index.js'
  },
  output: {
    path: path.resolve(__dirname, 'public/'),
    publicPath: 'http://localhost:3000/public',
    filename: '[name].js'
  },
  devtool: 'source-map',
  devServer: {
    contentBase: path.resolve(__dirname, 'public'),
    hot: true,
    quiet: false,
    inline: true,
    noInfo: true,
    publicPath: 'http://localhost:8080/public/',
    stats: {
      colors: true,
      chunks: false,
    },
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: 'node_modules',
        query: {
          presets: ['react', 'es2015', 'stage-0']
        }
      },
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ],
//  qwexternals: {
//    'cheerio': 'window',
//    'react/addons': true,
//    'react/lib/ExecutionEnvironment': true,
//    'react/lib/ReactContext': true,
//  }
};
