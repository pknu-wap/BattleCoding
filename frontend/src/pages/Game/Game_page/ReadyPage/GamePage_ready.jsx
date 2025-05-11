import "./GamePage_ready.scss";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function GamePage_ready() {
  const navigate = useNavigate();
  const location = useLocation();
  const { image, title, description, type } = location.state || {};

  const handleClick = (level) => {
    navigate('/game/question', {
        state: { type, level }
      });
  };

  return (
    <>
      <div className="readyContainer">
        <div className="quizSection">
          <div className="quizCard">
            <img className="quizImg" src={image} alt={title} />
            <div className="quizContent">
              <h2>{title}</h2>
              <p dangerouslySetInnerHTML={{ __html: description }}/>
            </div>
          </div>
        </div>
        <div className="buttonSection">
          <button className="readyBtn" onClick={() => handleClick(1)}>초급</button>
          <button className="readyBtn" onClick={() => handleClick(2)}>중급</button>
          <button className="readyBtn" onClick={() => handleClick(3)}>고급</button>
        </div>
      </div>
    </>
  );
}

export default GamePage_ready;
