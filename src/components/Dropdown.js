import React from 'react';

const Dropdown = (props) => {
  return (
    <select value={props.value} onChange={(e) => {
      props.onChange(e.target.value);
      e.preventDefault();
    }}>
      <option></option>
      {props.options.map((o, idx) => {
        return (<option key={idx} value={o.value}>{o.text}</option>)
      })}
    </select>
  )
};

export default Dropdown;
