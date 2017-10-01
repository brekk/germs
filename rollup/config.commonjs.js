const pkg = require(`../package.json`)
const germs = require(`../lib/index`)

const {bundle} = germs

const external = (
  pkg && pkg.dependencies ?
    Object.keys(pkg.dependencies) :
    []
)

module.exports = bundle({
  name: pkg.name,
  alias: {
    [`@testing`]: `./testing`,
    [`@tools`]: `./tools`
  },
  external,
  input: `src/index.js`,
  output: {
    file: `./${pkg.name}.js`,
    format: `cjs`
  }
})
