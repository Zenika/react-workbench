/* eslint-disable import/no-extraneous-dependencies */
const path = require('path')

const WORKBENCH_DIR = path.resolve(__dirname, '..', '..', '..')

module.exports = {
  devtool: 'eval',
  context: path.resolve(__dirname, '..'),
  entry: {
    app: [
      path.resolve(WORKBENCH_DIR, 'tmp', 'index.jsx'),
    ],
  },
  output: {
    path: '/',
    filename: 'bundle.js',
  },
  resolve: {
    extensions: ['.js', '.jsx', '.scss'],
    modules: [
      path.resolve(WORKBENCH_DIR, 'node_modules'),
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
          /src\/gui\/styles\/global\.scss/,
        ],
        use: ['style-loader', 'css-loader?modules', 'sass-loader'],
      },
      {
        test: /global\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
    ],
  },
}
