/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useContext, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import css from './rollcolumns.css';
import MainContext from './DefaultContext';

export default function LabelColumn(props) {
  const labRef = useRef();
  const { registerLabel, getName } = useContext(MainContext);
  const { children, name, to, onClick, className, full, disabled, ...rest } = props;

  const labelProps = { name: getName ? getName() : name };
  labelProps.id = `rollcolumn-label-${labelProps.name}-${to}`;

  function handleClick(e) {
    onClick(e);
  }

  useEffect(() => {
    if (labRef.current && registerLabel) {
      registerLabel({
        ref: labRef.current,
        to,
        disabled,
      });
    }
  }, [labRef, to, disabled, registerLabel]);

  const cfgLabel = {
    [css.label]: true,
    [css.full]: !!full,
    [css.disabled]: !!disabled,
  };

  const labelClass = cx(cfgLabel, className, { full: !!full, disabled: !!disabled });

  return (
    <label id={labelProps.id} ref={labRef} htmlFor={`${name}`} className={labelClass} onClick={handleClick} {...rest}>
      {children}
    </label>
  );
}

LabelColumn.propTypes = {
  to: PropTypes.number.isRequired,
  children: PropTypes.any,
  className: PropTypes.string,
  full: PropTypes.bool,
  icon: PropTypes.string,
  name: PropTypes.string,
  onClick: PropTypes.func,
  store: PropTypes.any,
  style: PropTypes.any,
  disabled: PropTypes.bool,
};

LabelColumn.defaultProps = {
  children: null,
  className: null,
  full: false,
  icon: null,
  name: '',
  onClick: () => {},
  store: null,
  style: null,
  disabled: false,
};
