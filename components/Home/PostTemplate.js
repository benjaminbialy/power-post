import Link from "next/link";
import React from "react";

function PostTemplate({ href, text }) {
  return (
    <Link href={href}>
      <a className="flex-none flex flex-col items-center justify-between w-full h-[230px] p-8  max-w-sm ">
        {/* Swap div for optimised image */}
        <div className="bg-black w-32 h-32"></div>
        <p className="text-lg">{text}</p>
      </a>
    </Link>
  );
}

export default PostTemplate;
