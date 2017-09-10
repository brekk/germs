import {curry} from 'katsu-curry'
/**
 * subtract things
 * @method subtract
 * @param {number} a - a number
 * @param {number} b - b number
 * @returns {number} subtracted
 * @public
 * @example
 * import {subtract} from 'f-utility'
 * subtract(4, 2) // -2
 */
export const subtract = curry((a, b) => b - a)
