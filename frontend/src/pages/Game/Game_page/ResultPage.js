import React from "react";
import "./Game_page.css";
import PageHeader from "./PageHeader/PageHeader";
import Result from "./ResultPage/GamPage_result";

function PageResult() {
  return (
    <div className="Game_Page">
      <PageHeader />
      <Result />
    </div>
  );
}

export default PageResult;
