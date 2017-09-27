const pkg = require(`../package.json`)
const {bundle} = require(`../germs`)

const external = (
  pkg && pkg.dependencies ?
    Object.keys(pkg.dependencies) :
    []
)

module.exports = bundle({
  name: pkg.name,
  alias: {
    [`@tools`]: `./tools`
  },
  external,
  input: `src/index.js`,
  output: {
    file: `./${pkg.name}.js`,
    format: `cjs`
  }
})
