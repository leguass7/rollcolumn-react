import React, { useRef, useEffect, useCallback, useContext } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import css from './rollcolumns.css';

// IMPORTS
import { whithElement } from '../utilities/domUtils';
import MainContext from './DefaultContext';

export default function InputCol(props) {
  const refCtrl = useRef();
  let clicked = false;
  const { name, checked, value, order, onCheck, ...rest } = props;
  const { handleColumnChange } = useContext(MainContext);

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

  function onColumnCheck(e) {
    const obj = refCtrl.current || e.target || false;
    if (obj && obj.checked && handleColumnChange) {
      onCheck(obj);
      handleColumnChange(obj);
    }
  }

  function handleClickOrChange(e) {
    if (e.type === 'click') clicked = true;
    if (e.type === 'change' && clicked) {
      clicked = false;
      return false;
    }
    return onColumnCheck(e);
  }

  const inputClass = cx(css.dinamiccolsCtrl, `ctrl${order}`);

  return (
    <input
      ref={refCtrl}
      id={`ctrl-${name}-${order}`}
      type="radio"
      name={name}
      value={value}
      className={inputClass}
      onClick={handleClickOrChange}
      onChange={handleClickOrChange}
      {...rest}
    />
  );
}

InputCol.propTypes = {
  order: PropTypes.number,
  name: PropTypes.string.isRequired,
  checked: PropTypes.bool,
  value: PropTypes.any,
  onCheck: PropTypes.func,
};
InputCol.defaultProps = {
  order: 0,
  checked: null,
  value: 0,
  onCheck: () => {},
};
