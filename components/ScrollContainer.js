import React from "react";

function ScrollContainer({ children }) {
  return (
    <div className="flex items-center w-screen max-w-5xl overflow-x-scroll object-none bg-slate-400 h-[200px]">
      {children}
    </div>
  );
}

export default ScrollContainer;
