import Link from "next/link";
import React from "react";

function LinkButton({ text, accent = false, style = "", href }) {
  return (
    <Link href={href}>
      <a
        className={
          " cursor-pointer px-5 py-4 text-base font-medium text-center transition duration-500 ease-in-out transform  lg:px-10 rounded-xl  focus:outline-none focus:ring-2 focus:ring-offset-2  " +
          style +
          (accent
            ? "  focus:ring-blue-500 hover:bg-blue-700 bg-blue-600 text-white"
            : "  focus:ring-neutral-200 hover:bg-neutral-100 border-neutral-200 border-2 border-solid text-blue-600")
        }
      >
        {text}
      </a>
    </Link>
  );
}

export default LinkButton;
