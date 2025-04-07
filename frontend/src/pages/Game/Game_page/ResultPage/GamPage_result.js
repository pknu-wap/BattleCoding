import "./GamePage_result.css";
import { useNavigate } from "react-router-dom";

function GamePage_result() {
  const navigate = useNavigate();

  return (
    <div className="PageBackground">
      <div className="PageLayout">
        <div className="PageContent">
          <div className="Result_content">
            <div className="Result_main">
              <div className="guitar">
                <div className="resultimage">🎸</div>
              </div>
              <div className="CountText">
                <span className="Resultanswer">
                  <b className="Resultscore">?개 </b>
                  맞히셨습니다
                </span>
              </div>
              <div className="ResultContent">
                <div className="ResultButtonList">
                  <button className="ResultButton" type="button">
                    마이페이지
                  </button>
                  <button
                    className="ResultButton"
                    type="button"
                    onClick={() => navigate("/game/ready")}
                  >
                    다시하기
                  </button>
                  <button className="ResultButton" type="button">
                    홈으로
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GamePage_result;
