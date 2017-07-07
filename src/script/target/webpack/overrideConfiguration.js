const path = require('path')
const webpack = require('webpack')

module.exports = state => Object.assign({}, state.raw, {
  entry: {
    bundle: [
      'webpack-hot-middleware/client?reload=true',
      path.resolve(__dirname, '..', '..', '..', '..', 'dist', 'gui.build.js'),
    ],
  },
  output: {
    path: '/',
    filename: '[name].js',
    publicPath: '/',
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.WatchIgnorePlugin([path.resolve(__dirname, '..', '..', '..', '..', 'dist', 'component.js')]),
  ],
  resolve: Object.assign({}, state.raw.resolve, {
    modules: ['node_modules', path.resolve(__dirname, '..', '..', '..', '..', 'node_modules')],
  }),
})

