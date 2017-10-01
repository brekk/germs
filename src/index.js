import {germs as builder} from '@tools/builder'
import {rollup, bundle} from '@tools/bundler'
import {t} from '@testing/helper'
import {version} from '../package.json'

/* eslint-disable fp/no-mutation */
builder.rollup = rollup
builder.bundle = bundle
builder.version = version
builder.t = t
/* eslint-enable fp/no-mutation */

module.exports = builder
