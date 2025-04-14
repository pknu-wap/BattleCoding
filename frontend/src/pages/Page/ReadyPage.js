import React from "react";
import "./Page.css";
import Header from "./PageHeader/PageHeader";
import GameReady from "./PageReady/PageReady";

function PageReady() {
  return (
    <div className="Game_Page">
      <Header />
      <GameReady />
    </div>
  );
}

export default PageReady;
