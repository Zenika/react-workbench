import fs from 'fs'
import babel from 'rollup-plugin-babel'
import commonjs from 'rollup-plugin-commonjs'

const pkg = JSON.parse(fs.readFileSync('./package.json'))
const external = [
  ...Object.keys(pkg.dependencies || {}),
  ...Object.keys(pkg.devDependencies || {}),
  ...Object.keys(pkg.peerDependencies || {}),
]

export default {
  entry: 'src/script/index.js',
  dest: 'dist/script.build.js',
  moduleName: pkg.amdName || pkg.name,
  format: 'cjs',
  external,
  plugins: [
    babel({
      exclude: 'node_modules/**',
    }),
    commonjs(),
  ],
}
