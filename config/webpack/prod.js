const merge = require('webpack-merge');
const CompressionPlugin = require('compression-webpack-plugin');
const BrotliPlugin = require('brotli-webpack-plugin');
const zopfli = require('@gfx/zopfli');
const OfflinePlugin = require('@lcdp/offline-plugin');
const HtmlWebpackPartialsPlugin = require('html-webpack-partials-plugin');
// const TerserPlugin = require('terser-webpack-plugin');

const common = require('./common.js');
const paths = require('../paths');

module.exports = merge(common, {
  mode: 'production',
  optimization: {
    minimize: true,
  },
  plugins: [
    new HtmlWebpackPartialsPlugin({
      path: `${paths.assets}/analytics.html`,
      location: 'body',
      priority: 'low',
    }),
    new CompressionPlugin({
      compressionOptions: {
        numiterations: 15,
      },
      algorithm(input, compressionOptions, callback) {
        return zopfli.gzip(input, compressionOptions, callback);
      },
    }),
    new BrotliPlugin({
      asset: '[path].br[query]',
      test: /\.(js|css|html|svg)$/,
      threshold: 0,
      minRatio: 1,
    }),
    new OfflinePlugin({
      ServiceWorker: {
        events: true,
      },
      excludes: ['.htaccess', 'index.html'],
    }),
  ],
});
