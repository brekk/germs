      __ _  ___ _ __ _ __ ___  ___
     / _` |/ _ \ '__| '_ ` _ \/ __|
    | (_| |  __/ |  | | | | | \__ \
     \__, |\___|_|  |_| |_| |_|___/
     |___/                               

an opinionated hack-space for building things fast without doing a bunch of time setting things up

# Installation

-   `git clone https://github.com/brekk/germs.git PROJECT_NAME` - pull in the project
-   `cd PROJECT_NAME` - go to the project
-   `npm i` or `yarn install` -- install dependencies for this project
    -   you may need to `brew install yarn` first (on osx) -- otherwise you might want [this link](https://yarnpkg.com/en/docs/install) instead.
-   `npm i nps -g` or `yarn install nps global` -- add `nps` tool for better development QoL
-   `nps` - list the general commands of building

# Commands

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

# Contributions welcome!

# API

<!-- Generated by documentation.js. Update this documentation by updating the source code. -->
