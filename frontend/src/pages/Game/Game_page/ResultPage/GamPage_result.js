import "./GamePage_result.css";

function GamePage_result() {
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
                  <button className="ResultButton" type="button">
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
