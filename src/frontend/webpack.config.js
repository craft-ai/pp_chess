const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require('webpack');
const dotenv = require('dotenv');

const basePlugins = [
  new webpack.DefinePlugin({
    'process.env': JSON.stringify(Object.assign(
      {},
      dotenv.config().parsed,
      { NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development') }
    ))
  }),
  new HtmlWebpackPlugin({
    filename: 'index.html',
    template: './template/index.html'
  })
];

const devPlugins = basePlugins.concat([
  new CleanWebpackPlugin({
    cleanOnceBeforeBuildPatterns: ['**/*', '!.phantom'],
    cleanStaleWebpackAssets: false
  }),
]);

const prodPlugins = basePlugins.concat([
  new CleanWebpackPlugin({
    cleanOnceBeforeBuildPatterns: ['**/*', '!.phantom'],
  }),
  new CompressionPlugin(),
]);

const baseConfiguration = {
  entry: {
    app: './src/frontend/index.js'
  },
  output: {
    filename: '[name].bundle.[contenthash].js',
    path: path.join(`${__dirname}/src/frontend/public`),
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            cacheDirectory: true
          }
        }
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader',
            options: { url: false }
          },
          {
            loader: 'sass-loader'
          }
        ]
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader'
          }
        ]
      },
      {
        test: /\.(jpe?g|png|svg)$/,
        exclude: /node_modules/,
        loader: 'url-loader'
      },
      {
        test: /\.gif$/,
        exclude: /node_modules/,
        loader: 'url-loader'
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        exclude: /node_modules/,
        loader: 'url-loader'
      },
      {
        test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        exclude: /node_modules/,
        loader: 'url-loader'
      }
    ],
  },
};

const prodConfiguration = {
  optimization: {
    moduleIds: 'deterministic',
    runtimeChunk: 'single',
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
        asset: {
          test: /[\\/]www[\\/]/,
          name: 'assets',
          chunks: 'all',
        },
      },
    },
  },
  plugins: prodPlugins,
  mode: 'production',
};

const devConfiguration = {
  devtool: 'source-map',
  mode: 'development',
  plugins: devPlugins,
  devServer: {
    historyApiFallback: true,
    hot: true,
    open: true,
    port: 8080
  }
};

const getConfiguration = () => {
  if (process.env.NODE_ENV === 'production') {
    return { ...baseConfiguration, ...prodConfiguration };
  }
  else {
    return { ...baseConfiguration, ...devConfiguration };
  }
};

module.exports = getConfiguration();
