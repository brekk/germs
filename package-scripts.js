const {name} = require(`./package.json`)
const bootstrap = require(`./germs`)

module.exports = bootstrap(name, {
  // we wanna skip the test-helpers coverage here, as it is not part of our base coverage
  test: {
    description: `run all tests with coverage`,
    script: [
      `jest src/*.spec.js --coverage`,
      `--coveragePathIgnorePatterns test-helpers.js index.js ${name}.js node_modules/common-tags/*`
    ].join(` `),
    unit: {
      description: `run unit tests`,
      script: `jest src/*.spec.js`
    }
  }
})
