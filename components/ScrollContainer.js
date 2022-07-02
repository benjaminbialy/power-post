import React from "react";

function ScrollContainer({ children }) {
  return (
    <div className="flex items-center w-3/4 overflow-x-scroll bg-slate-400 h-[200px]">
      {children}
    </div>
  );
}

export default ScrollContainer;
