import React from "react";
import "./Game.css";
import GuestHeader from "./Game_main/GameHeader/GameHeader_guest";
import GameMain from "./Game_main/Game_main";

function GameGuest() {
  return (
    <div id="Member">
      <GuestHeader />
      <GameMain />
    </div>
  );
}

export default GameGuest;
