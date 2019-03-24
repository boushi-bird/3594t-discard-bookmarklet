const path = require('path')
const webpack = require('webpack')
const defines = require('./config/defines')

const objectMap = (o, func) => Object.assign({}, ...Object.entries(o).map(([k, v]) => func(k, v)))
const objectMapKeys = (o, func) => objectMap(defines, (k, v) => ({[func(k)]: v}))

const mode = (process.env.NODE_ENV || 'development')

module.exports = {
  mode,
  entry: {
    bundle: path.resolve(__dirname, 'src/index.js')
  },
  output: {
    path: path.resolve(__dirname, 'docs/scripts'),
    filename: '[name].js'
  },
  plugins: [
    new webpack.DefinePlugin(objectMapKeys(defines, k => `configDefines.${k}`))
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader'
      }
    ]
  },
  devServer: {
    host: '0.0.0.0'
  }
}
