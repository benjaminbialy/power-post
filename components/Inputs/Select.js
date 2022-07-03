import React from "react";

function Select({ options, id, value, setValue }) {
  return (
    <select onChange={(e) => setValue(e.target.value)} value={value} id={id}>
      {options.map((option) => (
        <option key={option.id} value={option.id}>
          {option.type}
        </option>
      ))}
    </select>
  );
}

export default Select;
