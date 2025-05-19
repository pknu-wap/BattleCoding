import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import "./GamePage_ready.scss";

function PracticeReady() {
  const navigate = useNavigate();
  const location = useLocation();
  const { image, title, description, type, isRanking } = location.state || {};

  useEffect(() => {
    if (!type) {
      alert("유형 정보가 없습니다. 메인으로 이동합니다.");
      navigate("/");
    }
  }, [type, navigate]);

  const handleClick = (difficulty) => {
    navigate('/game/question', {
      state: { type, difficulty, image, title, description, isRanking: location.state?.isRanking }
    });
  };

  return (
    <>
      <div className="readyContainer">
        <div className="quizSection">
          <div className="quizCard">
            <div className="quizContent">
              <h2>{title}</h2>
              <img className="quizImg" src={image} alt={title} />
              <p dangerouslySetInnerHTML={{ __html: description }} />
            </div>
          </div>
        </div>

        <div className="buttonSection">
          <button className="readyBtn" onClick={() => handleClick("EASY")}>
            초급
          </button>
          <button className="readyBtn" onClick={() => handleClick("MEDIUM")}>
            중급
          </button>
          <button className="readyBtn" onClick={() => handleClick("HARD")}>
            고급
          </button>
        </div>
      </div>
    </>
  );
}

export default PracticeReady;
