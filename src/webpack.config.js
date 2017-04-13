/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-console */
const path = require('path')

module.exports = {
  devtool: 'eval',
  context: path.resolve(__dirname, '..'),
  entry: {
    app: [
      path.resolve(__dirname, '..', 'tmp', 'index.jsx'),
    ],
  },
  output: {
    path: '/',
    filename: 'bundle.js',
  },
  resolve: {
    extensions: ['.js', '.jsx', '.scss'],
    modules: [
      'node_modules',
    ],
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: [
          /node_modules/,
        ],
        use: {
          loader: 'babel-loader',
          options: {
            plugins: [
              /* eslint-disable global-require */
              require('babel-plugin-react-docgen').default,
              require('babel-plugin-transform-class-properties'),
              require('babel-plugin-transform-object-rest-spread'),
              /* eslint-enable global-require */
            ],
            presets: [
              'es2017',
              [
                'es2015',
                {
                  modules: false,
                },
              ],
              'react',
            ],
          },
        },
      },
      {
        test: /\.scss?$/,
        exclude: [
          /node_modules/,
        ],
        use: ['style-loader', 'css-loader?modules', 'sass-loader'],
      },
    ],
  },
}
