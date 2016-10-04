var path = require('path');
var webpack = require('webpack');
var merge = require('webpack-merge');

const TARGET = process.env.npm_livecycle_event;

const PATHS = {
  app: path.join(__dirname, 'client'),
  build: path.join(__dirname, 'public'),
  style: path.join(__dirname, 'public/styles/stylesheet.css')
};

process.env.BABEL_ENV = TARGET;

const common = {
  entry: {
    app: PATHS.app,
    style: PATHS.style
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  output: {
    path: PATHS.app,
    filename: 'bundle.js',
    publicPath: path.join(__dirname, "build/")
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        include: PATHS.app,
        query: {
          presets: ['es2015', 'react', 'stage-0']
        }
      }
    ]
  }
}
//if (TARGET === 'start' || !TARGET) {
  module.exports = merge(common, {
    devtool: 'eval-source-map',
    devServer: {
      historyApiFallback: true,
      hot: true,
      inline: true,
      progress: true,
      stats: 'errors-only',
      host: process.env.HOST,
      port: process.env.PORT
    },
    module: {
      loaders: [
        {
          test: /\.css$/,
          loaders: ['style', 'css'],
          include: PATHS.app
        }
      ]
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
    ]
  })
//}
/*
module.exports = {
  entry: {
    app: ['./client/index.js'],
  },
  output: { path: __dirname, filename: 'public/bundle.js' },
  devtool: 'source-map',
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
};*/
