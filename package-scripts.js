const {name} = require(`./package.json`)
const bootstrap = require(`./lib/germs-builder`)

module.exports = bootstrap(name, {
  readme: {
    // we want to have the underlying script run, but we override here so we don't have a math API
    script: `echo "no API here!"`,
    description: `regenerate the readme, normally, but this time, do nothing`
  }
})
