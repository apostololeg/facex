const webpack = require('webpack');
const CopyPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
// const ComponentDirectoryPlugin = require('component-directory-webpack-plugin');
const FaviconWebpackPlugin = require('favicons-webpack-plugin');

const paths = require('../paths');
const {
  PRODUCTION,
  VERSION,
  PAGE_TITLE,
  PROTOCOL,
  SENTRY_DSN,
} = require('../const');

module.exports = {
  target: 'web',
  entry: [`${paths.client}/index.js`],
  output: {
    path: paths.build,
    publicPath: '/',
    filename: 'js/[name].js?v=[hash:5]',
  },
  resolve: {
    modules: [paths.client, 'node_modules'],
    alias: {
      config: paths.config,
      theme: `${paths.client}/theme.styl`,
    },
    // plugins: [new ComponentDirectoryPlugin()],
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },
  optimization: {
    moduleIds: 'named',
  },
  module: {
    rules: [
      {
        test: /\.worker\.js$/,
        include: `${paths.client}/workers/`,
        use: {
          loader: 'worker-loader',
          options: {
            esModule: false,
          },
        },
      },
      {
        test: /\.(j|t)sx?$/,
        loader: 'babel-loader',
        include: paths.client,
      },
      {
        test: /\.styl$/,
        use: [
          'style-loader',
          { loader: 'css-modules-typescript-loader' },
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: '[name]__[local]___[hash:base64:5]',
              },
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                ident: 'postcss',
                plugins: [
                  ['postcss-preset-env', { stage: 3, autoprefixer: true }],
                ],
              },
            },
          },
          {
            loader: 'stylus-loader',
          },
        ],
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.svg$/,
        exclude: paths.modules,
        oneOf: [
          {
            issuer: /\.(t|j)sx?$/,
            use: [
              {
                loader: 'babel-loader',
              },
              {
                loader: 'react-svg-loader',
              },
            ],
          },
          // {
          //   loader: 'file-loader',
          //   options: {
          //     name: 'static/[name].[ext]',
          //     outputPath: 'images/',
          //   },
          // },
        ],
      },
      {
        test: /\.wasm$/i,
        type: 'javascript/auto',
        use: {
          loader: 'file-loader',
        },
      },
      {
        test: /\.(woff|woff2|eot|ttf)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: 'static/[name].[ext]',
            outputPath: 'images/',
          },
        },
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new webpack.DefinePlugin({
      PRODUCTION: JSON.stringify(PRODUCTION),
      PROTOCOL: JSON.stringify(PROTOCOL),
      SENTRY_DSN: JSON.stringify(SENTRY_DSN),
      VERSION: JSON.stringify(VERSION),
    }),
    new webpack.ProvidePlugin({
      React: 'react',
    }),
    new CopyPlugin({
      patterns: [
        {
          from: `${paths.assets}/*.css`,
          to: paths.build,
        },
        {
          from: `${paths.assets}/fonts`,
          to: `${paths.build}/fonts`,
        },
        {
          from: `${paths.assets}/logo.svg`,
          to: paths.build,
        },
        {
          from: `${paths.modules}/@mediapipe/face_mesh`,
          to: `${paths.build}/face_mesh`,
        },
      ],
    }),
    new HtmlWebpackPlugin({
      domain: PRODUCTION
        ? 'https://facex.apostol.space'
        : 'http://localhost:7878',
      // lang: PAGE_LANG,
      title: PAGE_TITLE,
      filename: 'index.html',
      template: `${paths.assets}/index.html`,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true,
      },
    }),
    new FaviconWebpackPlugin({
      logo: `${paths.assets}/logo.svg`,
      mode: 'webapp', // optional can be 'webapp' or 'light' - 'webapp' by default
      devMode: 'webapp', // optional can be 'webapp' or 'light' - 'light' by default
      favicons: {
        appName: 'FaceLink',
        // appDescription: '',
        developerName: 'Me',
        developerURL: null, // prevent retrieving from the nearest package.json
        background: '#111',
        theme_color: '#111',
        display: 'fullscreen',
        icons: {
          coast: false,
          yandex: false,
        },
      },
    }),
    new MiniCssExtractPlugin({
      filename: PRODUCTION ? '[name].[fullhash].css' : '[name].css',
      chunkFilename: PRODUCTION ? '[id].[fullhash].css' : '[id].css',
    }),
  ],
};
