const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')
const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
  resolve: {
    modules: ['node_modules', path.join(__dirname, 'src'), 'shared'],
  },
  entry: {
    // main: ['@babel/polyfill', './src/index.js'],
    main: ['./src/index.js'],
  },
  output: {
    // filename: '[name].bundle.js',
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    compress: true,
    port: 9000,
    historyApiFallback: true,
    hot: true,
  },
  plugins: [
    new MiniCssExtractPlugin(),
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
    new webpack.ProvidePlugin({
      // This is a Replacement of long imports in every file
      /*
        import ReactDOM from ‘react-dom’
        import _ from 'lodash'
        import $ from 'jquery'
        import cssModule from 'react-css-modules'
      */
      React: 'react',
      ReactDOM: 'react-dom',
      $: 'jquery',
      _: 'lodash',
    }),
  ],
  module: {
    rules: [
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          // options: {
          //   presets: ['@babel/preset-env', '@babel/preset-react'],
          //   plugins: ['@babel/plugin-transform-runtime', '@babel/plugin-transform-arrow-functions'],
          // },
        },
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              // modules: true,
              // exportLocalsConvention: "camelCase",
              modules: {
                mode: 'local',
                exportLocalsConvention: 'camelCase',
              },
            },
          },
        ],
        include: /\.module\.css$/,
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
        exclude: /\.module\.css$/,
      },

      {
        test: /\.(gif|png|jpg|jpeg|svg)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        type: 'asset/resource',
      },
    ],
  },
}
