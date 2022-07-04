import React from "react";

function ScrollContainer({ children }) {
  return (
    <div
      className="flex flex-col items-center w-full px-4 py-4 overflow-y-scroll  border-2 border-gray-200 h-[600px] lg:flex-row"
      // className="flex items-center w-screen max-w-5xl overflow-x-scroll
      // object-none bg-slate-400 h-[200px]"
    >
      {children}
    </div>
  );
}

export default ScrollContainer;
