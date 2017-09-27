import generateAlias from 'rollup-plugin-alias'
import progress from 'rollup-plugin-progress'
import babili from 'rollup-plugin-babel-minify'
import commonjs from 'rollup-plugin-commonjs'
import cleanup from 'rollup-plugin-cleanup'
import resolve from 'rollup-plugin-node-resolve'
import buble from 'rollup-plugin-buble'
import version from 'rollup-plugin-git-version'

/**
 * @function rollup
 * @param {Object} custom - configuration
 * @param {string} custom.name - name of project
 * @param {Object} custom.alias - aliases to use in the project
 * @param {Array} custom.external - an array of external dependencies
 * @returns {Object} config file for rollup
 * @example
 * const pkg = require(`../package.json`)
 * const {rollup} = require(`../germs`)
 * const external = (
 *   pkg && pkg.dependencies ? Object.keys(pkg.dependencies) : []
 * )
 *
 * module.exports = rollup({
 *   name: pkg.name,
 *   alias: {
 *     [`@tools`]: `./tools`
 *   },
 *   external
 * })
 */
export const rollup = ({name, alias, external}) => ({
  exports: `named`,
  external,
  globals: {
  },
  name,
  plugins: [
    generateAlias(alias),
    progress(),
    version(),
    commonjs({
      extensions: [`.js`],
      include: `node_modules/**`,
      namedExports: {
      }
    }),
    buble(),
    resolve({
      jsnext: true,
      main: true
    }),
    cleanup({
      comments: `none`
    }),
    babili({
      // removeConsole: true
    })
  ]
})

export default rollup

/**
 * @function bundle
 * @param {Object} custom - configuration
 * @param {string} custom.name - name of project
 * @param {Object} custom.alias - aliases to use in the project
 * @param {Array} custom.external - an array of external dependencies
 * @param {string} custom.input - an input file
 * @param {Object} custom.output - an output object
 * @param {string} custom.output.file - an output file
 * @param {string} custom.output.format - an output format
 * @returns {Object} config file for rollup
 * @example
 * const pkg = require(`../package.json`)
 * const {bundle} = require(`../germs`)
 * const external = (
 *   pkg && pkg.dependencies ?
 *     Object.keys(pkg.dependencies) :
 *     []
 * )
 * module.exports = bundle({
 *   name: pkg.name,
 *   alias: {
 *     [`@tools`]: `./tools`
 *   },
 *   external,
 *   input: `src/index.js`,
 *   output: {
 *     file: `./${pkg.name}.js`,
 *     format: `cjs`
 *   }
 * })
 */
export const bundle = ({name, alias, external, input, output}) => {
  return Object.assign({}, rollup({name, alias, external}), {
    input,
    output
  })
}
