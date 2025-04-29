import React from "react";
import "./Game_page.css";
import Navbar_game from "../../Navbar/Navbar_game";
import GameReady from "./ReadyPage/GamePage_ready";

function PageReady() {
  return (
    <div className="Game_Page">
      <Navbar_game />
      <GameReady />
    </div>
  );
}

export default PageReady;
