import React from "react";

function TextArea({
  id,
  placeholder,
  value,
  setValue,
  disabled = false,
  rows = 20,
}) {
  return (
    <textarea
      rows={rows}
      disabled={disabled}
      id={id}
      className={
        "w-full px-5 py-3 text-base placeholder-gray-300 transition duration-500 ease-in-out transform border border-transparent rounded-lg text-neutral-600 bg-gray-50 focus:outline-none focus:border-transparent focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-300 " +
        (disabled && " resize-none hover:cursor-pointer ")
      }
      placeholder={placeholder}
      value={value}
      onChange={(e) => setValue(e.target.value)}
      onBlur={() => setValue((prev) => prev.trim())}
    />
  );
}

export default TextArea;
