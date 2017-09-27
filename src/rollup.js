import generateAlias from 'rollup-plugin-alias'
import progress from 'rollup-plugin-progress'
import babili from 'rollup-plugin-babel-minify'
import commonjs from 'rollup-plugin-commonjs'
import cleanup from 'rollup-plugin-cleanup'
import resolve from 'rollup-plugin-node-resolve'
import buble from 'rollup-plugin-buble'
import version from 'rollup-plugin-git-version'

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

export const bundle = ({name, alias, external, input, output}) => {
  return Object.assign({}, rollup({name, alias, external}), {
    input,
    output
  })
}
