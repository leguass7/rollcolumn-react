/* eslint-disable no-restricted-properties */
/**
 * Arredonda numero com casas decimais
 * @function round
 * @param {Number} number
 * @param {Number} precision
 * @example
 * round(1234.5678, 1); // 1234.6
 */
export function round(number, precision = 4) {
  const factor = Math.pow(10, precision);
  const tempNumber = number * factor;
  const roundedTempNumber = Math.round(tempNumber);
  return roundedTempNumber / factor;
}
