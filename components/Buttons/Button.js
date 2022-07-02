import React from "react";

function Button({
  text,
  accent = false,
  style = "",
  loading = false,
  onClick = () => {
    alert("I was clicked");
  },
}) {
  return (
    <button
      onClick={onClick}
      className={
        " px-5 py-4 text-base font-medium text-center transition duration-500 ease-in-out transform  lg:px-10 rounded-xl  focus:outline-none focus:ring-2 focus:ring-offset-2  " +
        style +
        (accent
          ? "  focus:ring-blue-500 hover:bg-blue-700 bg-blue-600 text-white"
          : "  focus:ring-neutral-200 hover:bg-neutral-100 border-neutral-200 border-2 border-solid text-blue-600")
      }
      disabled={loading}
    >
      {loading ? "Loading..." : text}
    </button>
  );
}

export default Button;
