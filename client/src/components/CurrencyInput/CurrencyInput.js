import React from 'react'
import PropTypes from 'prop-types'
import Input from '../Input/Input';
import './CurrencyInput.css'

const CurrencyInput = ({ defaultValue, onChange }) => (
  <div className={'currency-input'}>
    <span>£</span>
    <Input
      type="number"
      defaultValue={defaultValue}
      onChange={onChange}/>
  </div>
);

CurrencyInput.propTypes = {
  defaultValue: PropTypes.number,
  onChange: PropTypes.func,
};

CurrencyInput.defaultProps = {
  onChange: () => {},
};

export default CurrencyInput;
