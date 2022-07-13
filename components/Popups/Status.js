import React from "react";

function Status({ text, success = false, setStatus, styles }) {
  return (
    <div
      className={
        "flex border-[3px] bg-white w-11/12 xs:w-96 rounded-xl self-center z-50 fixed p-4 text-gray-800 font-semibold fade-in fade-out hover:cursor-pointer  " +
        (success ? " border-green-500 " : " border-red-500 ") +
        styles
      }
    >
      <p className="w-full text-center">{text}</p>
      <button
        onClick={() => {
          setStatus({ show: false });
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 text-gray-400 transition duration-300 ease-in-out transform hover:text-black"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </button>
    </div>
  );
}

export default Status;
