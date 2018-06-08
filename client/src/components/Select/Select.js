import React from 'react';
import './Select.css';

export default ({ options, defaultValue, onChange }) => (
  <div className="select">
    <select defaultValue={defaultValue} onChange={({ target: { value } }) => onChange(value)}>
      {options.map(op => <option key={`option ${op}`} value={op}>{op}</option>)}
    </select>
  </div>
);
