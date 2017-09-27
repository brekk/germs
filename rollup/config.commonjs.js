const pkg = require(`../package.json`)
const {bundle} = require(`../lib/rollup`)

const external = (
  pkg && pkg.dependencies ?
    Object.keys(pkg.dependencies) :
    []
)

module.exports = bundle({
  name: pkg.name,
  alias: {
    [`@math`]: `./math`
  },
  external,
  input: `src/index.js`,
  output: {
    file: `./${pkg.name}.js`,
    format: `cjs`
  }
})
