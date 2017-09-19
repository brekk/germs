/* global test */
import {t} from './test-helpers'
import {add, subtract, divide, multiply} from '@app'

test(`add`, () => {
  t.plan(3)
  t.is(typeof add, `function`)
  t.is(typeof add(1)(2), `number`)
  t.is(add(1)(2), 3)
})

test(`subtract`, () => {
  t.plan(3)
  t.is(typeof subtract, `function`)
  t.is(typeof subtract(1)(2), `number`)
  t.is(subtract(1)(2), 1)
})

test(`multiply`, () => {
  t.plan(3)
  t.is(typeof multiply, `function`)
  t.is(typeof multiply(1)(2), `number`)
  t.is(multiply(1)(2), 2)
})

test(`divide`, () => {
  t.plan(3)
  t.is(typeof divide, `function`)
  t.is(typeof divide(2)(1), `number`)
  t.is(divide(2)(1), 0.5)
})
