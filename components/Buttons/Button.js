import React from "react";

function Button({
  text,
  accent = false,
  styles = "",
  loading = false,
  loadingText = "Loading...",
  onClick = () => {
    alert("I was clicked");
  },
}) {
  return (
    <button
      onClick={onClick}
      className={
        " px-5 py-4 text-base font-medium text-center transition duration-500 ease-in-out transform lg:px-10 rounded-xl  focus:outline-none focus:ring-2 focus:ring-offset-2  " +
        styles +
        (accent
          ? "  focus:ring-sky-400 hover:bg-sky-600 bg-sky-400 text-white"
          : "  focus:ring-neutral-200 hover:bg-neutral-100 border-neutral-200 border-2 border-solid text-sky-400")
      }
      disabled={loading}
    >
      {loading ? loadingText : text}
    </button>
  );
}

export default Button;
