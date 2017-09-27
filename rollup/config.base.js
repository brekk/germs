const pkg = require(`../package.json`)
const {rollup} = require(`../germs`)

const external = (
  pkg && pkg.dependencies ?
    Object.keys(pkg.dependencies) :
    []
)

module.exports = rollup({
  name: pkg.name,
  alias: {
    [`@tools`]: `./tools`
  },
  external
})
