const path = require('path');

module.exports = {
  entry: {
    'bundle': [path.resolve('./lib/CancelableAPI.js')]
  },
  output: {
    library: 'CancelableAPI',
    libraryTarget: 'umd'
  },
  externals: [
    'axios',
    'url-join',
    'p-cancelable'
  ],
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.(js)$/,
        loader: 'eslint-loader',
        exclude: /node_modules/
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  },
  resolve: {
    extensions: ['.js']
  }
};
