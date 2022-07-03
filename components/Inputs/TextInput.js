import React from "react";

function TextInput({
  type = "text",
  value,
  setValue,
  required = false,
  id,
  placeholder = "Your email",
}) {
  return (
    <input
      id={id}
      className="block w-full px-5 py-3 text-base placeholder-gray-300 transition duration-500 ease-in-out transform border border-transparent rounded-lg text-neutral-600 bg-gray-50 focus:outline-none focus:border-transparent focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-300"
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={(e) => setValue(e.target.value)}
      required={required}
    />
  );
}

export default TextInput;
