import React, { useEffect } from "react";
import "./Game.css";
import GuestHeader from "./Game_main/GameHeader/GameHeader_guest";
import GameMain from "./Game_main/Game_main";

function GameGuest() {
  useEffect(() => {
    localStorage.setItem("isLogin", "false");
  }, []);

  return (
    <div id="Member">
      <GuestHeader />
      <GameMain />
    </div>
  );
}

export default GameGuest;
