/* eslint-disable no-param-reassign */
/* eslint-disable react/forbid-prop-types */
import React, { useRef, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import css from './rollcolumns.css';

// IMPORTS
import { whithElement } from '../utilities/domUtils';

export default function InputCol(props) {
  const refCtrl = useRef();
  const { name, checked, value, order, ...rest } = props;

  const setChecked = useCallback(
    (me) => {
      if (checked) {
        whithElement(`input[name="${me.name}"]`, (input) => {
          input.checked = false;
        });
      }
      me.checked = checked;
    },
    [checked],
  );

  useEffect(() => {
    if (refCtrl.current) {
      refCtrl.current.setAttribute('data-rollcolumn-order', order);
      setChecked(refCtrl.current);
    }
  }, [refCtrl, order, setChecked]);

  const inputClass = cx(css.dinamiccolsCtrl, `ctrl${order}`);

  return (
    <input
      ref={refCtrl}
      id={`ctrl-${name}-${order}`}
      type="radio"
      name={name}
      value={value}
      className={inputClass}
      {...rest}
    />
  );
}

InputCol.propTypes = {
  order: PropTypes.number,
  name: PropTypes.string.isRequired,
  checked: PropTypes.bool,
  value: PropTypes.any,
};
InputCol.defaultProps = {
  order: 0,
  checked: null,
  value: 0,
};
