import React from 'react';
import PropTypes from 'prop-types';
import InputControl from './InputControl';

export default function RenderInputs(props) {
  const { columnList, name } = props;

  return (
    <>
      {columnList.map((column) => {
        const { value, order, checked } = column;
        const key = `rollcolumn-input-ctrl-${name}-${column.order}`;
        return (
          <InputControl
            key={key}
            name={name}
            columnCount={columnList.length}
            value={value}
            order={order}
            checked={checked}
          />
        );
      })}
    </>
  );
}

RenderInputs.propTypes = {
  columnList: PropTypes.array,
  name: PropTypes.string.isRequired,
};
RenderInputs.defaultProps = {
  columnList: [],
};
