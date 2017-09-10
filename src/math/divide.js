import {curry} from 'katsu-curry'

/**
 * divide things
 * @method divide
 * @param {number} a - a number
 * @param {number} b - b number
 * @returns {number} divided
 * @public
 * @example
 * import {divide} from 'f-utility'
 * divide(4, 2) // 0.5
 */
export const divide = curry((b, a) => a / b)
