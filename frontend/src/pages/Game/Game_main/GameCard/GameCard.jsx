import "./GameCard.scss";
import { useNavigate } from "react-router-dom";

function GameCard({ image, title, description }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/game/ready", {
      state: { image, title, description },
    });
  };

  return (
    <div className="GameCard">
      <div className="GameCard_main" role="listitem" onClick={handleClick}>
        <div className="game_card_cover">
          <img className="game_card_image" src={image} alt={title} />
        </div>
        <div className="game_card_body">
          <div className="game_card_content">
            <div className="game_card_text">
              <div className="game_card_title">{title}</div>
              <div className="game_card_elaborate" dangerouslySetInnerHTML={{ __html: description }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GameCard;
