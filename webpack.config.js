var debug = true;
var path = require('path');

var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var extractLess = new ExtractTextPlugin({
  filename: "[name].[contenthash].css",
  disable: debug
});

module.exports = {
	entry: './src/index.js',
  devtool: debug ? "inline-sourcemap": false,
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      { test: /\.(js)$/, use: 'babel-loader' },
      {
        test: /\.css$/,
        use: [{
          loader: 'style-loader'
        }, {
          loader: 'css-loader?modules&importLoaders=1&localIdentName=[name]_[local]__[hash:base64:5]'
        }],
      },
      {
        test: /\.less$/,
        use: extractLess.extract({
          use: [{
            loader: 'css-loader?modules&importLoaders=1&localIdentName=[name]_[local]__[hash:base64:5]'
          }, {
            loader: 'less-loader'
          }],
          fallback: "style-loader"
        }),
      }
    ]
  },
  plugins: [
    extractLess,
    new HtmlWebpackPlugin({
      template: 'src/index.html'
    })
  ]
}