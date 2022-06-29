import React from "react";

function NumberInput({ label, value, setValue, id, min, max }) {
  return (
    <div className="my-2 w-full flex flex-col">
      <label htmlFor={label + "-" + id}>{label}:</label>
      <input
        className="border border-black rounded p-1"
        id={"temperature-" + id}
        type="number"
        value={value}
        onChange={(e) => setValue(parseFloat(e.target.value))}
        min={min}
        max={max}
        step={0.1}
      />
    </div>
  );
}

export default NumberInput;
