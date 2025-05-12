import "./GameCard.scss";
import { useNavigate } from "react-router-dom";

function GameCard({ image, title, description, type }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/game/ready", {
      state: { image, title, description, type }, 
    });
  };

  return (
    <div className="gameCard" onClick={handleClick}>
      <div className="gameCardCover">
        <img className="gameCardImage" src={image} alt={title} />
      </div>
      <div className="gameCardBody">
        <div className="gameCardTitle">{title}</div>
        <div
          className="gameCardElaborate"
          dangerouslySetInnerHTML={{ __html: description }}
        />
      </div>
    </div>
  );
}

export default GameCard;
