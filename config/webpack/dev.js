const webpack = require('webpack');
const merge = require('webpack-merge');

const common = require('./common.js');
const paths = require('../paths');

const BundleAnalyzerPlugin =
  require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const ReactRefreshPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

const plugins = [new ReactRefreshPlugin(), new webpack.NoEmitOnErrorsPlugin()];

if (process.env.ANALYZE) {
  plugins.push(new BundleAnalyzerPlugin());
}

module.exports = merge(common, {
  mode: 'development',
  entry: ['react-hot-loader/patch'],
  output: {
    publicPath: '/',
  },
  plugins,
  devtool: 'source-map',
  devServer: {
    hot: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true,
      'Access-Control-Max-Age': '3600',
      'Access-Control-Allow-Headers': 'Content-Type, Cookie',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS, PATCH',
    },
    static: paths.build,
    compress: true,
    historyApiFallback: true,
    port: 7878,
  },
});
