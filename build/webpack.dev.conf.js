var utils = require('./utils')
var webpack = require('webpack')
var config = require('../config')
var merge = require('webpack-merge')
var baseWebpackConfig = require('./webpack.base.conf')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
var srcConfig = require('../config/srcConfig')
var projects = srcConfig.eachTemp

// add hot-reload related code to entry chunks
Object.keys(baseWebpackConfig.entry).forEach(function (name) {
  baseWebpackConfig.entry[name] = ['./build/dev-client'].concat(baseWebpackConfig.entry[name])
})


const plugins = [
  new webpack.DefinePlugin({
    'process.env': config.dev.env
  }),
  // https://github.com/glenjamin/webpack-hot-middleware#installation--usage
  new webpack.HotModuleReplacementPlugin(),
  new webpack.NoErrorsPlugin(),
  // new webpack.NoEmitOnErrorsPlugin(),
  // https://github.com/ampedandwired/html-webpack-plugin
  // new HtmlWebpackPlugin({
  //   filename: 'index.html',
  //   template: 'index.html',
  //   inject: true
  // }),
  new FriendlyErrorsPlugin()
]

var entries = {}

projects.forEach((obj, index)=> {
  plugins.push(new HtmlWebpackPlugin(obj.HtmlWebpackPlugin))
})

projects.forEach((obj, index)=> {
  const entry = obj.entry
  entry.forEach((e,i)=> {
    entries[entry[i]] = './src/router/' + entry[i] + '/' + entry[i] + '.js'
  })
})

module.exports = merge(baseWebpackConfig, {
  entry: entries,
  module: {
    rules: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap })
  },
  // cheap-module-eval-source-map is faster for development
  devtool: '#cheap-module-eval-source-map',
  plugins: plugins
})
