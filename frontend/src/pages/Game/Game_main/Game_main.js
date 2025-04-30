import { useState } from "react";
import "./Game_main.scss";
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
    <div className="gameMain">
      <div className="gameContent">
        <SearchBar onSearch={handleSearch} />
        <div className="gameCards">
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
  );
}

export default Game_main;
