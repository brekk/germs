const pkg = require(`../package.json`)
const germs = require(`../lib/index`)
const {rollup} = germs

const external = (
  pkg && pkg.dependencies ?
    Object.keys(pkg.dependencies) :
    []
)

module.exports = rollup({
  name: pkg.name,
  alias: {
    [`@testing`]: `./testing`,
    [`@tools`]: `./tools`
  },
  external
})
