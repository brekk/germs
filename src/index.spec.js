/* global test */
import {version as v} from '../package.json'
import {t} from './test-helpers'
import {version, germs, rollup, bundle} from './index'

test(`version`, () => {
  t.is(typeof version, `string`)
  t.is(version, v)
})

test(`germs`, () => {
  t.plan(3)
  t.is(typeof germs, `function`)
  /* eslint-disable max-len */
  t.deepEqual(germs(`butts`), {
    scripts: {
      dependencies: {
        script: `nps dependencies.graph.base && node node_modules/concurrently/src/main.js --kill-others-on-fail --prefix-colors "bgBlue.bold,bgMagenta.bold,bgGreen.bold" --prefix "[{name}]" --names "dependencies.graph.svg,dependencies.graph.dot,dependencies.graph.json" 'nps dependencies.graph.svg' 'nps dependencies.graph.dot' 'nps dependencies.graph.json'`,
        description: `regenerate all dependencies`,
        check: {
          script: `depcheck`,
          description: `check dependencies`
        },
        graph: {
          base: {
            script: `madge --webpack-config webpack.config.js src --json | jayin "_.toPairs(x).map(([k, v]) => ([k,_.map(v, (y) => y.indexOf('node_modules') > -1 ?'Ⓜ ' + y.substr(y.indexOf('node_modules') + 13) : y)])).filter(([k, v]) => !(k.indexOf('test-helpers') > -1)).filter(([k, v]) => !(k.indexOf('spec') > -1)).filter(([k, v]) => !(k.indexOf('butts') > -1)).reduce((agg, [k, v]) => Object.assign({}, agg, {[k]: v}), {})" > dependency-graph.json`,
            desciption: `generate the base graph as a json file`
          },
          svg: {
            script: `nps dependencies.graph.base && cat dependency-graph.json | madge --webpack-config webpack.config.js --stdin --image dependencies.svg`,
            description: `generate a visual dependency graph`
          },
          json: {
            script: `nps dependencies.graph.base && cat dependency-graph.json | madge --webpack-config webpack.config.js --stdin --json`,
            description: `generate a visual dependency graph in json`
          },
          dot: {
            script: `nps dependencies.graph.base && cat dependency-graph.json | madge --webpack-config webpack.config.js --stdin --dot`,
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
        script: `node node_modules/concurrently/src/main.js --kill-others-on-fail --prefix-colors "bgBlue.bold,bgMagenta.bold" --prefix "[{name}]" --names "lint.src,lint.jsdoc" 'nps lint.src' 'nps lint.jsdoc'`,
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
        script: `jest src/*.spec.js --coverage butts.js`,
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
        description: `run the main bundle task`,
        script: `rollup -c rollup/config.commonjs.js`
      },
      build: {
        description: `convert files individually`,
        script: `babel src -d lib --ignore *.spec.js`
      },
      care: {
        description: `run all the things`,
        script: `node node_modules/concurrently/src/main.js --kill-others-on-fail --prefix-colors "bgBlue.bold,bgMagenta.bold,bgGreen.bold,bgBlack.bold,bgCyan.bold,bgRed.bold" --prefix "[{name}]" --names "lint,build,bundle,test,readme,dependencies" 'nps lint' 'nps build' 'nps bundle' 'nps test' 'nps readme' 'nps dependencies'`
      },
      precommit: `nps care`
    }
  })
  /* eslint-disable max-len */
  t.deepEqual(germs(`butts`, {
    dependencies: `a`,
    readme: `b`,
    lint: `c`,
    test: `d`,
    docs: `e`,
    bundle: `f`,
    build: `g`,
    care: `h`,
    precommit: `i`
  }), {
    scripts: {
      dependencies: `a`,
      readme: `b`,
      lint: `c`,
      test: `d`,
      docs: `e`,
      bundle: `f`,
      build: `g`,
      care: `h`,
      precommit: `i`
    }
  })
})
const dropPlugins = (x) => {
  x.plugins = []
  return x
}

test(`bundle`, () => {
  t.plan(2)
  t.is(typeof bundle, `function`)
  const name = `butts`
  const alias = {
    [`@tools`]: `./tools`
  }
  const external = []
  const input = `cool-source.js`
  const output = {
    file: `cool-output.js`,
    format: `cjs`
  }
  t.deepEqual(
    dropPlugins(
      bundle({name, alias, external, input, output})
    ),
    dropPlugins(
      {
        exports: `named`,
        external,
        globals: {
        },
        input,
        name,
        output,
        plugins: []
      }
    )
  )
})

test(`rollup`, () => {
  t.plan(2)
  t.is(typeof rollup, `function`)
  const name = `butts`
  const alias = {
    [`@tools`]: `./tools`
  }
  const external = []
  const output = rollup({name, alias, external})
  t.deepEqual(dropPlugins(output), dropPlugins({
    exports: `named`,
    external,
    globals: {
    },
    name,
    plugins: []
  }))
})
