const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    'index': [path.resolve('./src/javascripts/entry.js')]
  },
  output: {
    filename: '[name].js',
    path: path.resolve('./dist')
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.(js)$/,
        loader: 'eslint-loader',
        // lib-distもlintの対象外にする
        exclude: /(node_modules|lib-dist)/
      },
      {
        test: /\.js$/,
        // lib-distもlintの対象外にする
        exclude: /(node_modules|lib-dist)/,
        loader: 'babel-loader'
      },
      {
        test: /\.pug$/,
        use: [{
          loader: 'pug-loader',
          options: {
            pretty: true
          }
        }]
      }
    ]
  },
  resolve: {
    extensions: ['.js']
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './src/html/index.pug'),
      hash: true,
      inject: true
    })
  ]
};
