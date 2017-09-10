import {curry} from 'katsu-curry'

/**
 * add things
 * @method add
 * @param {number} a - a number
 * @param {number} b - b number
 * @returns {number} sum
 * @public
 * @example
 * import {add} from 'f-utility'
 * add(4, 2) // 6
 */
export const add = curry((a, b) => a + b)
