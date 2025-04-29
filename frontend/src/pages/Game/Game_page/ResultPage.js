import React from "react";
import "./Game_page.css";
import Navbar_game from "../../Navbar/Navbar_game";
import Result from "./ResultPage/GamPage_result";

function PageResult() {
  return (
    <div className="Game_Page">
      <Navbar_game />
      <Result />
    </div>
  );
}

export default PageResult;
