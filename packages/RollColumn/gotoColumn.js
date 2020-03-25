/* eslint-disable no-param-reassign */
import Control from './Control';
import { whithElement } from '../utilities/domUtils';

/**
 * @function gotoColumn
 * @param {String} name
 * @param {Number} numberColumn
 * @param {Boolean} emit
 * @returns {HTMLElement}
 */
export default function gotoColumn(name, numberColumn, emit = false) {
  let result = false;
  whithElement(`input[name="${name}"]`, (input) => {
    input.checked = false;
    const order = parseInt(input.getAttribute('data-rollcolumn-order'), 10);
    if (numberColumn === order) {
      input.checked = true;
      result = input;
      if (emit) Control.emitEventColumn(name, numberColumn);
    }
  });
  return result;
}
