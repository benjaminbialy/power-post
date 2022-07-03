import Link from "next/link";
import React from "react";

function LinkButton({
  text,
  accent = false,
  style = "",
  href,
  padding = " px-5 py-4 lg:px-10 ",
}) {
  return (
    <Link href={href}>
      <a
        className={
          " cursor-pointer text-base font-medium text-center transition duration-500 ease-in-out transform rounded-xl  focus:outline-none focus:ring-2 focus:ring-offset-2  " +
          padding +
          style +
          (accent
            ? "  focus:ring-sky-400 hover:bg-sky-600 bg-sky-400 text-white"
            : "  focus:ring-neutral-200 hover:bg-neutral-100 border-neutral-200 border-2 border-solid text-sky-400")
        }
      >
        {text}
      </a>
    </Link>
  );
}

export default LinkButton;
