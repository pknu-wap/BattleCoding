import React from "react";
import { useNavigate } from "react-router-dom";
import Main from "./pages/Main/Main";
import Login from "./pages/Login/Login";
import GameHeaderGuest from "./pages/Game/GameHeader/GameHeader_Guest";
import GameHeaderUser from "./pages/Game/GameHeader/GameHeader_User";
import Game from "./pages/Game/Game";
import "./App.scss";

function App() {
  const navigate = useNavigate();

  return (
    <>
      <div className="main">
        <Login />
      </div>
      <div id="GamePage">
        <GameHeaderGuest />
        <Game />
        <GameHeaderUser />
        <Game />
      </div>
      <div>
        <Main />
      </div>
    </>
  );
}

export default App;
