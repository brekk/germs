const {name} = require(`./package.json`)
const germs = require(`./germs`)

module.exports = germs.build(name)
