import React from "react";

function Layout({ children }) {
  return (
    <div className="flex justify-center min-h-screen w-screen">{children}</div>
  );
}

export default Layout;
