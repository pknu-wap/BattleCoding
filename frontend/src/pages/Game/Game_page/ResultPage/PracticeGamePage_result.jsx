import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import api from "../../../../api/api";
import "./PracticeGamePage_result.scss";

function PracticeResult() {
  const navigate = useNavigate();
  const location = useLocation();
  const { image, title, description, type, difficulty, score = 0, isRanking = false, mode } = location.state || {};

  const [xpEarned, setXpEarned] = useState(0);
  const [updatedXp, setUpdatedXp] = useState(0);

  const difficultyLabel = { EASY: "초급", MEDIUM: "중급", HARD: "고급" }[difficulty] || "";
  const titleLabel = difficultyLabel ? `${title} ${difficultyLabel} 결과` : `${title} 결과`;

  const totalQuestions = 10;

  const handleExit = () => {
    switch (mode) {
      case "practice":
        navigate("/game/practice");
        break;
      case "mini":
        navigate("/game/mini");
        break;
    }
  };

  useEffect(() => {
    const fetchXp = async () => {
      if (!isRanking) return;

      try {
        const response = await api.get("/user/me");
        console.log("내 정보 응답: ", response.data);
        setUpdatedXp(response.data.xp);
        setXpEarned(score * 10); // 일단 한 문제당 10xp라고 가정 -> 정해지면 수정
      } catch (err) {
        console.error("XP 정보 가져오기 실패: ", err);
      }
    };

    fetchXp();
  }, [isRanking]);

  const handleRetry = () => {
    let retryPath = "/game/ready";

    if (!difficulty) {
      if (type === "WORD_CHAIN") retryPath = "/game/ready/mini/four";
      else if (type === "GUESS_WHO") retryPath = "/game/ready/mini/person";
    }

    navigate(retryPath, {
      state: { image, title, description, type, difficulty },
    });
  };

  return (
    <div className="practiceResultWrapper">
      <div className="practiceResultSection">
        <div className="resultCard">
          <div className="resultText">
            <div className="resultInfo">
              <div className="leftSection">
                <h2>{titleLabel}</h2>
                <img className="resultImg" src={image} alt={title} />
                <p>
                  <span className="highlightScore">{score}</span> 개 맞았습니다!
                </p>
              </div>

              <div className="rightSection">
                <div className="summaryBox">
                  <p>문제 수 : {totalQuestions}</p>
                  <p>정답 수 : {score}</p>
                  <p className="summaryRatio">
                    {score} / {totalQuestions}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="btnSection">
        <button onClick={() => navigate("/mypage")}>마이페이지</button>
        <button onClick={handleRetry}>다시</button>
        <button onClick={handleExit}>나가기</button>
      </div>
    </div>
  );
}

export default PracticeResult;
