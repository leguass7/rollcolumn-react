/**
 * @function whithElement
 * @param {String} selector
 * @param {Function} callback
 * @returns {Array<NodeList>}
 * @example
 * whithElement('.classname', (el) => { el.todo ...})
 */
export function whithElement(selector, callback) {
  const sel = document.querySelectorAll(selector);
  for (let i = 0; i < sel.length; i++) {
    if (typeof callback === 'function') {
      callback(sel[i]);
    }
  }
  return sel;
}
