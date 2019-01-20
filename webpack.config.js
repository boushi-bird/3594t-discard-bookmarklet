const path = require('path')

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
