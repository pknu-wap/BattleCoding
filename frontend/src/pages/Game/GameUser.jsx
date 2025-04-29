import React, { useEffect, useState } from "react";
import "./Game.css";
import Navbar from "../Navbar/Navbar";
import GameMain from "./Game_main/Game_main";

function GameUser() {
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLogin(true);
    }
    else {
      setIsLogin(false);
    }
  }, []);

  return (
    <div id="Member">
      <Navbar type={"user" /* isLogin ? "user" : "guest" */} />
      <GameMain />
    </div>
  );
}

export default GameUser;
