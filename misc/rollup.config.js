import path from 'path'
import fs from 'fs'
import babel from 'rollup-plugin-babel'
import nodeResolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'

const pkg = JSON.parse(fs.readFileSync('./package.json'))

export default {
  input: pkg['jsnext:main'] || 'src/gui/index.jsx',
  name: pkg.amdName || pkg.name,
  output: {
    file: 'dist/gui.build.js',
    format: process.env.FORMAT || 'umd',
  },
  external: [path.resolve('./src/gui/component.js')],
  plugins: [
    babel({
      exclude: 'node_modules/**',
    }),
    nodeResolve({
      jsnext: true,
    }),
    commonjs({
      include: 'node_modules/**',
      extensions: ['.js', '.jsx'],
      namedExports: {
        'node_modules/react-dom/index.js': ['render'],
        'node_modules/react/react.js': ['Children', 'Component', 'createElement'],
        'node_modules/trampss-redux-factory/index.js': ['simpleObject', 'keyValue'],
        'node_modules/trampss-redux-factory/helpers/index.js': ['mapAction', 'mapPayload'],
      },
    }),
  ],
}
