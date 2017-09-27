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

#### Contributions welcome!

`germs` is opinionated, but your opinions / contributions are welcome!

