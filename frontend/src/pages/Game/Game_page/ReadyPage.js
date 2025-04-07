import React from "react";
import "./Game_page.css";
import PageHeader from "./PageHeader/PageHeader";
import GameReady from "./ReadyPage/GamePage_ready";

function PageReady() {
  return (
    <div className="Game_Page">
      <PageHeader />
      <GameReady />
    </div>
  );
}

export default PageReady;
