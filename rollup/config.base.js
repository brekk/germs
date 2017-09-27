const pkg = require(`../package.json`)
const {rollup} = require(`./lib/rollup`)

const external = (
  pkg && pkg.dependencies ?
    Object.keys(pkg.dependencies) :
    []
)

module.exports = rollup({
  name: pkg.name,
  alias: {
    [`@math`]: `./math`
  },
  external
})
