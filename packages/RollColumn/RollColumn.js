import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { UniversalStyle as Style, StyleCacheProvider } from 'react-css-component';
import css from './rollcolumns.css';
import { round } from '../utilities/formats';
import { filterChildrenElements } from '../utilities/reactUtils';

import RenderInputs from './RenderInputs';
import Column from './Column';

import MainContext from './DefaultContext';

export default function RollColumn(props) {
  const { children, className, name, style } = props;
  const [columnList, setColumnList] = useState([]);

  const initialWidth = filterChildrenElements(children, [Column]).length * 100;
  const [columnWidth, setColumnWidth] = useState(`${initialWidth}%`);

  function calculateOrder(order) {
    const div = round(100 / columnList.length, 3);
    const index = order - 1 < 0 ? 0 : order - 1;
    const result = index * div;
    return result !== 0 ? result * -1 : 0;
  }

  const columnRegister = useCallback((columnProps) => {
    setColumnList((oldList) => {
      const newList = oldList.filter((c) => c.id !== columnProps.id);
      const result = [...newList, { ...columnProps }];
      setColumnWidth(`${result.length * 100}%`);
      return result;
    });
  }, []);

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
      <div className={mainClass}>
        <RenderInputs name={name} columnList={columnList} />
        <MainContext.Provider value={{ columnRegister, registerLabel, getName }}>
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
};

RollColumn.defaultProps = {
  className: null,
  children: null,
  style: {},
};
