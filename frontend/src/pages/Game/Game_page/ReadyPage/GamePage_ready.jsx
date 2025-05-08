import "./GamePage_ready.scss";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {useEffect} from "react";

function GamePage_ready() {
  const navigate = useNavigate();
  const location = useLocation();
  const { image, title, description } = location.state || {};

  // ✅ 로그인 안 된 경우 Login 화면으로 이동
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/auth/login");
    }
  }, [navigate]);

  return (
    <>
      <div className="pageBackground">
        <div className="problemSection">
          <div className="problemWrapper">
            <div className="problemImage">
              <img src={image} alt={title} />
            </div>
            <div className="problemDescription">
              <h2>{title}</h2>
              <p>{description.replace(/<br\s*\/?>/g, " ")}</p>            </div>
          </div>
        </div>

        <div className="buttonSection">
          <button className="readyButton" onClick={() => navigate("/game/question")}>초급</button>
          <button className="readyButton" onClick={() => navigate("/game/question")}>중급</button>
          <button className="readyButton" onClick={() => navigate("/game/question")}>고급</button>
        </div>
      </div>
    </>
  );
}

export default GamePage_ready;
