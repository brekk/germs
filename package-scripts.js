const {name} = require(`./package.json`)
const bootstrap = require(`./lib/germs-builder`)

module.exports = bootstrap(name, {
  readme: {
    script: `documentation readme README.md -s "Example API" src/**.js`,
    description: `regenerate the readme`
  }
})
