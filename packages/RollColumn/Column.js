import React, { useRef, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import css from './rollcolumns.css';

import MainContext from './DefaultContext';

export default function Column(props) {
  const colRef = useRef();
  const { columnRegister, getName } = useContext(MainContext);
  const { children, className, order, checked, value, name, style, onCheck } = props;

  const columnProps = { name: getName ? getName() : name };
  columnProps.id = `rollcolumn-item-${columnProps.name}-${order}`;

  useEffect(() => {
    if (colRef.current && columnRegister) {
      colRef.current.setAttribute('data-rollcolumn-order', order);
      columnRegister({
        id: colRef.current.getAttribute('id'),
        ref: colRef.current,
        order,
        checked,
        value,
        onCheck,
      });
    }
  }, [columnRegister, order, checked, value, onCheck]);

  const styles = { ...style, order: columnProps.order };
  const classe = cx(css.item, className);

  return (
    <div id={columnProps.id} ref={colRef} className={classe} style={styles}>
      {children}
    </div>
  );
}

Column.propTypes = {
  children: PropTypes.any,
  className: PropTypes.string,
  order: PropTypes.number.isRequired,
  checked: PropTypes.bool,
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  style: PropTypes.object,
  name: PropTypes.string,
  onCheck: PropTypes.func,
};

Column.defaultProps = {
  children: null,
  className: null,
  checked: false,
  value: 0,
  style: {},
  name: 'noNamed',
  onCheck: () => {},
};
