import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { UniversalStyle as Style, StyleCacheProvider } from 'react-css-component';

import css from './rollcolumns.css';
import { round } from '../utilities/formats';
import { filterChildrenElements } from '../utilities/reactUtils';
import Control from './Control';
import RenderInputs from './RenderInputs';
import Column from './Column';

import MainContext from './DefaultContext';

export default function RollColumn(props) {
  const { children, className, name, style, onColumnChange } = props;
  const [columnList, setColumnList] = useState([]);

  const initialWidth = filterChildrenElements(children, [Column]).length * 100;
  const [columnWidth, setColumnWidth] = useState(`${initialWidth}%`);

  function calculateOrder(order) {
    const div = round(100 / columnList.length, 3);
    const index = order - 1 < 0 ? 0 : order - 1;
    const result = index * div;
    return result !== 0 ? result * -1 : 0;
  }

  const handleColumnChange = useCallback(
    (objInput) => {
      const ord = parseInt(objInput.getAttribute('data-rollcolumn-order'), 10);
      if (objInput) onColumnChange(objInput, ord || false);
    },
    [onColumnChange],
  );

  const columnRegister = useCallback(
    (columnProps) => {
      setColumnList((oldList) => {
        const newList = oldList.filter((c) => c.id !== columnProps.id);
        const result = [...newList, { ...columnProps }];
        Control.setControlColumns({ name, handleColumnChange }, result);
        setColumnWidth(`${result.length * 100}%`);
        return result;
      });
    },
    [name, handleColumnChange],
  );

  const registerLabel = useCallback(
    (labelProps) => {
      const { to, disabled } = labelProps;
      const attribFor = disabled ? '' : `ctrl-${name}-${to}`;
      labelProps.ref.setAttribute('for', attribFor);
    },
    [name],
  );

  const getName = useCallback(() => {
    return name;
  }, [name]);

  function buildStyles(columns) {
    return columns
      .map((col) => {
        const calcCol = calculateOrder(col.order);
        return `#ctrl-${name}-${col.order}:checked ~ .${css.content} {
        -o-transform:translateX(${calcCol}%);
        -ms-transform:translateX(${calcCol}%);
        -moz-transform:translateX(${calcCol}%);
        -webkit-transform:translateX(${calcCol}%);
        transform:translateX(${calcCol}%);
      }
      `;
      })
      .join('');
  }

  const mainClass = cx(css.rollcolumns);
  const contentClass = cx(css.content, className);
  const styles = {
    ...style,
    width: columnWidth,
    maxWidth: columnWidth,
  };

  return (
    <StyleCacheProvider>
      <Style css={buildStyles(columnList)} />
      <div id={name} className={mainClass}>
        <MainContext.Provider value={{ columnRegister, handleColumnChange, registerLabel, getName }}>
          <RenderInputs name={name} columnList={columnList} />
          <div className={contentClass} style={styles}>
            {children}
          </div>
        </MainContext.Provider>
      </div>
    </StyleCacheProvider>
  );
}

RollColumn.propTypes = {
  name: PropTypes.string.isRequired,
  className: PropTypes.string,
  children: PropTypes.any,
  style: PropTypes.object,
  onColumnChange: PropTypes.func,
};

RollColumn.defaultProps = {
  className: null,
  children: null,
  style: {},
  onColumnChange: () => {},
};
