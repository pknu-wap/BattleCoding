import "./GameCard.css";

function GameCard({ image, title, description }) {
  return (
    <div className="GameCard">
      <div className="GameCard_main" role="listitem">
        <div className="game_card_cover">
          <img className="game_card_image" src={image} alt={title} />
        </div>
        <div className="game_card_body">
          <div className="game_card_content">
            <div className="game_card_text">
              <span className="game_card_title">{title}</span>
              <span className="game_card_elaborate">{description}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GameCard;
