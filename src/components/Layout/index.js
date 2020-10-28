import React from "react";
import "./index.css";

const Layout = (props) => {
  return (
    <>
      <div className="page-header"></div>

      <div className="page-main">{props.children}</div>
      <div className="page-footer"></div>
    </>
  );
};

export default Layout;
