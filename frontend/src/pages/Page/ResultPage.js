import React from "react";
import "./Page.css";
import Header from "./PageHeader/PageHeader";
import Result from "./PageResult/PageResult";

function PageResult() {
  return (
    <div className="Game_Page">
      <Header />
      <Result />
    </div>
  );
}

export default PageResult;
