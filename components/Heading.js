import React from "react";

function Heading({ text, styles }) {
  return (
    <h3
      className={
        "max-w-5xl text-xl xs:text-2xl font-medium leading-none  md:text-3xl lg:text-4xl  " +
        styles
      }
    >
      {text}
    </h3>
  );
}

export default Heading;
