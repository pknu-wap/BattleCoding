import { useNavigate, useLocation } from "react-router-dom";
import "./GamePage_result.scss";

function GamePage_result() {
  const navigate = useNavigate();
  const location = useLocation();
  const { image, title, description, type } = location.state || {};

  return (
    <div className="resultWrapper">
      <div className="resultSection">
        <div className="resultCard">
          <img className="resultImg" src={image} alt={title} />
          <div className="resultText">
            <h2>{title} 결과</h2>
            <p>score개 맞았습니다!</p>
          </div>
        </div>
      </div>
      <div className="btnSection">
        <button onClick={() => navigate("/mypage")}>마이페이지</button>
        <button onClick={() => navigate("/game/ready", { state: { image, title, description, type }})}>다시</button>
        <button onClick={() => navigate("/")}>메인</button>
      </div>
    </div>
  );
}

export default GamePage_result;
