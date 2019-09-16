import resolve from 'rollup-plugin-node-resolve'
import babel from 'rollup-plugin-babel'
import commonjs from 'rollup-plugin-commonjs'

export default {
  input: 'src/index.js',
  output: {
    file: 'dist/bundle.js',
    format: 'umd',
    sourcemap: true,
    compact: true,
    globals: {
      window: 'window',
    }
  },
  external: [ 'window' ],
  plugins: [
    resolve({
      browser: true,
      extensions: ['.js', '.json'],
    }),
    commonjs({}),
    babel({
      exclude: 'node_modules/**'
    }),
  ]
}
