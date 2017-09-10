import {curry} from 'katsu-curry'

/**
 * multiply things
 * @method multiply
 * @param {number} a - a number
 * @param {number} b - b number
 * @returns {number} multiplied
 * @public
 * @example
 * import {multiply} from 'f-utility'
 * multiply(4, 2) // 8
 */
export const multiply = curry((a, b) => a * b)
