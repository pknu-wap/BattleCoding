import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import api from "../../../../api";
import "./GamePage_result.scss";

function GamePage_result() {
  const navigate = useNavigate();
  const location = useLocation();
  const { image, title, description, type, difficulty, score = 0, isRanking = false } = location.state || {};

  const [xpEarned, setXpEarned] = useState(0);
  const [updatedXp, setUpdatedXp] = useState(0);

  const difficultyLabel = { EASY: "초급", MEDIUM: "중급", HARD: "고급" }[difficulty] || "";

  useEffect(() => {
    const fetchXp = async () => {
      if (!isRanking) return;

      try {
        const response = await api.get("/user/me");
        setUpdatedXp(response.data.totalXp);
        setXpEarned(response.data.lastEarnedXp);
      } catch (err) {
        console.error("XP 정보 가져오기 실패: ", err);
      }
    };

    fetchXp();
  }, [isRanking]);

  return (
    <div className="resultWrapper">
      <div className="resultSection">
        <div className="resultCard">
          <img className="resultImg" src={image} alt={title} />
          <div className="resultText">
            <h2>{title} {difficultyLabel} 결과</h2>
            <p>{score}개 맞았습니다!</p>

            {isRanking && (
              <div className="xpInfo">
                <p>획득 XP: {xpEarned} XP</p>
                <p>총 누적 XP: {updatedXp}</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="btnSection">
        <button onClick={() => navigate("/mypage")}>마이페이지</button>
        <button
          onClick={() =>
            navigate("/game/ready", {
              state: { image, title, description, type, difficulty, isRanking }
            })
          }
        >다시</button>
        <button onClick={() => navigate("/")}>메인</button>
      </div>
    </div>
  );
}

export default GamePage_result;
