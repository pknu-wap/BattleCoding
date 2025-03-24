import React from "react";
import { useNavigate } from "react-router-dom";
import Main from "./pages/Main/Main";
import Login from "./pages/Login/Login";
import GameHeader from "./pages/Game/GameHeader/GameHeader";
import Game from "./pages/Game/Game";
import "./App.scss";

function App() {
  const [filteredGames, setFilteredGames] = useState(GameCard_Data);

  const handleSearch = (term) => {
    const filtered = GameCard_Data.filter((game) =>
      game.title.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredGames(filtered);
  };

  return (
    <>
      <div className="main">
        <Login />
      </div>
      <div id="GamePage">
        <GameHeader />
        <Game />
      </div>
      <div>
        <Main />
      </div>
    </>
  );
}

export default App;
