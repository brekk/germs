const {name} = require(`./package.json`)
const utils = require(`nps-utils`)

const {
  concurrent: all,
  series
  // mkdirp
} = utils
const {
  nps: allNPS
} = all

const filterSpecs = [
  `jayin "_.toPairs(x)`,
  `.map(([k, v]) => ([k,`,
  `_.map(v, (y) => y.indexOf('node_modules') > -1 ?`,
  `'Ⓜ ' + y.substr(y.indexOf('node_modules') + 13) :`,
  ` y)`,
  `]))`,
  `.filter(([k, v]) => !(k.indexOf('test-helpers') > -1))`,
  `.filter(([k, v]) => !(k.indexOf('spec') > -1))`,
  `.filter(([k, v]) => !(k.indexOf('${name}') > -1))`,
  `.reduce((agg, [k, v]) => Object.assign({}, agg, {[k]: v}), {})"`
].join(``)

const DEPGRAPH = `dependency-graph.json`

module.exports = {
  scripts: {
    dependencies: {
      script: series(
        `nps dependencies.graph.base`,
        allNPS(
          `dependencies.graph.svg`,
          `dependencies.graph.dot`,
          `dependencies.graph.json`
        )
      ),
      description: `regenerate all dependencies`,
      check: {
        script: `depcheck`,
        description: `check dependencies`
      },
      graph: {
        base: {
          script: `madge src --json | ${filterSpecs} > ${DEPGRAPH}`,
          desciption: `generate the base graph as a json file`
        },
        svg: {
          script: series(
            `nps dependencies.graph.base`,
            `cat ${DEPGRAPH} | madge --stdin --image dependencies.svg`
          ),
          description: `generate a visual dependency graph`
        },
        json: {
          script: series(
            `nps dependencies.graph.base`,
            `cat ${DEPGRAPH} | madge --stdin --json`
          ),
          description: `generate a visual dependency graph in json`
        },
        dot: {
          script: series(
            `nps dependencies.graph.base`,
            `cat ${DEPGRAPH} | madge --stdin --dot`
          ),
          description: `generate a visual dependency graph in dot`
        }
      }
    },
    readme: {
      script: `documentation readme README.md -s "API" src/*/*.js`,
      description: `regenerate the readme`
    },
    lint: {
      description: `lint both the js and the jsdoc`,
      script: allNPS(`lint.src`, `lint.jsdoc`),
      src: {
        script: `eslint src/*.js`,
        description: `lint js files`
      },
      jsdoc: {
        script: `documentation lint src/*/*.js`,
        description: `lint jsdoc in files`
      }
    },
    test: {
      description: `run all tests with coverage`,
      script: [
        `jest src/*.spec.js --coverage`,
        `--coveragePathIgnorePatterns test-helpers.js ${name}.js`
      ].join(` `),
      unit: {
        description: `run unit tests`,
        script: `jest src/*.spec.js`
      }
    },
    docs: {
      description: `auto regen the docs`,
      script: `documentation build src/**/*.js -f html -o docs -a private -a public -a protected`
    },
    bundle: {
      description: `run the main bundle task`,
      script: `rollup -c rollup/config.commonjs.js`
    },
    build: {
      description: `convert files individually`,
      script: `babel src -d lib --ignore *.spec.js`
    },
    care: {
      description: `run all the things`,
      script: allNPS(`lint`, `bundle`, `build`, `test`, `readme`, `dependencies`)
    },
    precommit: `nps care`
  }
}
