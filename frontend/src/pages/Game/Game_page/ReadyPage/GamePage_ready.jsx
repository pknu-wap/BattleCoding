import "./GamePage_ready.scss";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";

function GamePage_ready() {
  const navigate = useNavigate();
  const location = useLocation();
  const { image, title, description, type } = location.state || {};

  useEffect(() => {
    if (!type) {
      alert("유형 정보가 없습니다. 메인으로 이동합니다.");
      navigate("/");
    }
  }, [type, navigate]);

  const handleClick = (level) => {
    navigate('/game/question', {
        state: { type, level, image, title, description, level }
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
