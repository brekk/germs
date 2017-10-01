[![npm](https://img.shields.io/npm/dw/germs.svg)](https://github.com/brekk/germs)
[![npm](https://img.shields.io/npm/l/germs.svg)](https://www.npmjs.com/package/germs)
[![npm](https://img.shields.io/github/tag/brekk/germs.svg)](https://github.com/brekk/germs)

# germs

an opinionated hack-space for building things fast without spending a bunch of time setting things up

## Installation

Installing `germs` as a dependency:

`yarn install germs nps nps-utils -D` or `npm i germs nps nps-utils -D`

Installing `nps` - a delightful build tool (optional but useful):

`yarn install nps global` or `npm i nps -g`

## Using germs

Create a new file `package-scripts.js`, and place the following in it.

    const germs = requⅰre("germs")
    const {name} = requⅰre("package.json")
    module.exports = germs(name)

Here is an example from `germs` own specific [package-script.js file](https://github.com/brekk/germs/blob/master/package-scripts.js).

## Opinions

`germs` relies on the following modules for a good build experience:

### Build

-   `nps` for build tasks

### Compile

-   `babel` for per-file conversion
-   `rollup` for bundled conversion

### Test

-   `jest` for testing
-   `execa` for testing CLI implementations
-   `dont-break` for downstream testing

### Quality of Life for Developers

-   `eslint` for static analysis rules (static analysis rules!)
-   `documentation` for automatic jsdoc > documentation generation
-   `madge` for dependencies and graphs
-   `depcheck` for (sometimes-unreliable) dependency checking
-   `updtr` for automatic package updates
-   `husky` for some commit conventions (use `--no-verify` to skip)

## Commands

-   `nps dependencies.check` - check dependencies
-   `nps dependencies.graph` - generate a visual dependency graph
-   `nps dependencies.graphjson` - generate a visual dependency graph in json
-   `nps dependencies.graphdot` - generate a visual dependency graph in dot
-   `nps readme` - regenerate the readme
-   `nps lint` - lint both the js and the jsdoc
-   `nps lint.src` - lint js files
-   `nps lint.jsdoc` - lint jsdoc in files
-   `nps test` - run all tests with coverage
-   `nps test.unit` - run unit tests
-   `nps docs` - auto regen the docs
-   `nps bundle` - run the main bundle task
-   `nps build` - convert files individually
-   `nps care` - run all the things
-   `nps precommit` - nps care

## Contributing

_Contributions welcome!_

`germs` is opinionated, but your suggestions / contributions are welcome.

## API

<!-- Generated by documentation.js. Update this documentation by updating the source code. -->

### rollup

**Parameters**

-   `custom` **[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)** configuration
    -   `custom.name` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** name of project
    -   `custom.alias` **[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)** aliases to use in the project
    -   `custom.external` **[Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)** an array of external dependencies
    -   `custom.alterPlugins` **[Function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function)** an optional function which gets the plugins as input
    -   `custom.customize` **[Function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function)** an optional function which allows you to alter all output

**Examples**

```javascript
const pkg = require(`../package.json`)
const {rollup} = require(`../germs`)
const external = (
  pkg && pkg.dependencies ? Object.keys(pkg.dependencies) : []
)

module.exports = rollup({
  name: pkg.name,
  alias: {
    [`@tools`]: `./tools`
  },
  external
})
```

Returns **[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)** config file for rollup

### bundle

**Parameters**

-   `custom` **[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)** configuration
    -   `custom.name` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** name of project
    -   `custom.alias` **[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)** aliases to use in the project
    -   `custom.external` **[Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)** an array of external dependencies
    -   `custom.alterPlugins` **[Function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function)** an optional function which gets the plugins as input
    -   `custom.customize` **[Function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function)** an optional function which allows you to alter all output
    -   `custom.input` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** an input file
    -   `custom.output` **[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)** an output object
        -   `custom.output.file` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** an output file
        -   `custom.output.format` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** an output format

**Examples**

```javascript
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
```

Returns **[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)** config file for rollup
