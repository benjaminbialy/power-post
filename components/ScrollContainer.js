import React from "react";

function ScrollContainer({ children, styles = "lg:h-[266px] lg:flex-row " }) {
  return (
    <div
      className={
        "flex flex-col items-center w-full px-4 py-4 overflow-y-scroll border-2  border-gray-200 h-[600px] " +
        styles
      }
    >
      {children}
    </div>
  );
}

export default ScrollContainer;
