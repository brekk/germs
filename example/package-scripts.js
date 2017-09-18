const germs = require(`germs`)
const {name} = require(`./package.json`)

const overrides = {}
germs(name, overrides)
