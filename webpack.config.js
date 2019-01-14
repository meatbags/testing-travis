/*
dev dependencies/ scripts
npm install --save-dev @babel/core @babel/preset-env babel-loader babel-minify-webpack-plugin css-loader mini-css-extract-plugin node-sass optimize-css-assets-webpack-plugin postcss-loader sass-loader style-loader uglifyjs-webpack-plugin webpack webpack-cli
"pack": "webpack --mode production",
"watch": "webpack --mode development --watch"
*/

// modules
var path = require('path');
var webpack = require('webpack');
var MinifyPlugin = require("babel-minify-webpack-plugin");
var MiniCssExtractPlugin = require("mini-css-extract-plugin");
var UglifyJsPlugin = require("uglifyjs-webpack-plugin");
var OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

// prefix
var appName = 'APP';

// paths
var pathJS = './js/main.js';
var pathSCSS = './scss/main.js';
var pathOutput = 'build';

var exportJS = {
  entry: {'app.min': pathJS},
  output: {
    library: appName,
    libraryTarget: 'var',
    path: path.resolve(__dirname, pathOutput),
    filename: '[name].js'
  },
  module: {
    rules: [{
      test: /\.(js|jsx)$/,
      exclude: /node_modules/,
      use: {
        loader: "babel-loader"
      }
    }]
  },
  resolve: {
    extensions: ['*', '.js']
  },
  plugins: [
    new MinifyPlugin({}, {comments: false})
  ],
  stats: {colors: true, warnings: false}
};

var exportCSS = {
  entry: {'style.webpack': pathSCSS},
  output: {
    path: path.resolve(__dirname, pathOutput),
    filename: '[name].js'
  },
  module: {
    rules: [{
      test: /\.scss$/,
      use: [
        {
          loader: MiniCssExtractPlugin.loader,
          options: {}
        }, {
          loader: 'css-loader',
          options: {importLoaders: 2, sourceMap: true}
        }, {
          loader: 'sass-loader',
          options: {sourceMap: true}
        }
      ]
    }]
  },
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: true
      }),
      new OptimizeCSSAssetsPlugin({})
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "./style.css",
      allChunks: true
    })
  ],
  stats: {colors: true, warnings: false}
}

module.exports = [exportJS, exportCSS];
