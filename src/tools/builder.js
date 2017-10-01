import * as utils from 'nps-utils'

const {
  concurrent: all,
  series
  // mkdirp
} = utils
const {
  nps: allNPS
} = all

// this should eventually be replaced with `binoculars`
const filterSpecs = (name) => ([
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
].join(``))

const DEPGRAPH = `dependency-graph.json`

const madge = `madge --webpack-config webpack.config.js`

export const build = (name, overrides = {}) => {
  const NPS_COMMANDS = {
    scripts: Object.assign({
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
            script: `${madge} src --json | ${filterSpecs(name)} > ${DEPGRAPH}`,
            desciption: `generate the base graph as a json file`
          },
          svg: {
            script: series(
              `nps dependencies.graph.base`,
              `cat ${DEPGRAPH} | ${madge} --stdin --image dependencies.svg`
            ),
            description: `generate a visual dependency graph`
          },
          json: {
            script: series(
              `nps dependencies.graph.base`,
              `cat ${DEPGRAPH} | ${madge} --stdin --json`
            ),
            description: `generate a visual dependency graph in json`
          },
          dot: {
            script: series(
              `nps dependencies.graph.base`,
              `cat ${DEPGRAPH} | ${madge} --stdin --dot`
            ),
            description: `generate a visual dependency graph in dot`
          }
        }
      },
      readme: {
        script: `documentation readme -s "API" src/**.js`,
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
          // not 100% why common-tags is showing up in the coverage tests, so ignore it for now
          // TODO: figure out if this is needed later on
          `--coveragePathIgnorePatterns ${name}.js node_modules/common-tags/*`
        ].join(` `),
        unit: {
          description: `run unit tests`,
          script: `jest src/*.spec.js`
        }
      },
      docs: {
        description: `auto regen the docs`,
        script: `documentation build src/**.js -f html -o docs -a private -a public -a protected`,
        serve: {
          description: `serve the documentation`,
          script: `documentation serve src/**.js -a private -a public -a protected`
        }
      },
      bundle: {
        description: `generate bundles`,
        script: allNPS(`bundle.commonjs`, `bundle.es6`),
        commonjs: {
          description: `run the commonjs bundle task`,
          script: `rollup -c rollup/config.commonjs.js`
        },
        es6: {
          description: `run the es6 bundle task`,
          script: `rollup -c rollup/config.es6.js`
        }
      },
      build: {
        description: `convert files individually`,
        script: `babel src -d lib --ignore *.spec.js`
      },
      care: {
        description: `run all the things`,
        script: allNPS(`lint`, `build`, `bundle`, `test`, `readme`, `dependencies`)
      },
      precommit: `nps care`
    }, overrides)
  }
  return NPS_COMMANDS
}
