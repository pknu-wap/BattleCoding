import { useState } from "react";
import "./Game_main.css";
import SearchBar from "./SearchBar/SearchBar";
import GameCard from "./GameCard/GameCard";
import GameCard_Data from "./GameCard/GameCard_Data";

function Game_main() {
  const [filteredGames, setFilteredGames] = useState(GameCard_Data);

  const handleSearch = (term) => {
    const filtered = GameCard_Data.filter((game) =>
      game.title.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredGames(filtered);
  };

  return (
    <div className="GamePage_background">
      <div className="GamePage_layout">
        <SearchBar onSearch={handleSearch} />
        <div className="GameCardLayout">
          <div className="GameCard_root">
            <div className="GameCardList" role="list">
              {filteredGames.length === 0 ? (
                <div className="Browsing">검색 결과가 없습니다.</div>
              ) : (
                filteredGames.map((data, index) => (
                  <GameCard
                    key={index}
                    image={data.image}
                    title={data.title}
                    description={data.description}
                  />
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Game_main;
