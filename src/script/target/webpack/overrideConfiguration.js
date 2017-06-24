const path = require('path')

module.exports = state => Object.assign({}, state.raw, {
  entry: {
    bundle: path.resolve(__dirname, '..', '..', '..', '..', 'dist', 'gui.build.js'),
  },
  output: {
    path: path.resolve('..', '..', 'public'),
    filename: '[name].js',
    publicPath: '/',
  },
})

