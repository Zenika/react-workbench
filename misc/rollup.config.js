import path from 'path'
import fs from 'fs'
import babel from 'rollup-plugin-babel'
import nodeResolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'

const pkg = JSON.parse(fs.readFileSync('./package.json'))

export default {
  entry: pkg['jsnext:main'] || 'src/gui/start.jsx',
  dest: 'gui.build.js',
  sourceMap: path.resolve(pkg.main),
  moduleName: pkg.amdName || pkg.name,
  format: process.env.FORMAT || 'umd',
  external: [path.resolve('./src/gui/public/component.js')],
  plugins: [
    babel(),
    nodeResolve({
      jsnext: true,
    }),
    commonjs({
      include: 'node_modules/**',
      extensions: ['.js', '.jsx'],
      namedExports: {
        'node_modules/react-dom/index.js': ['render'],
        'node_modules/react/react.js': ['Children', 'Component', 'createElement'],
      },
    }),
  ],
}
