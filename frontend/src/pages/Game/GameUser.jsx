import React from "react";
import "./Game.css";
import UserHeader from "./Game_main/GameHeader/GameHeader_user";
import GameMain from "./Game_main/Game_main";

function GameUser() {
  return (
    <div id="Member">
      <UserHeader />
      <GameMain />
    </div>
  );
}

export default GameUser;
