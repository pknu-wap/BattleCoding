import "./PageResult.css";

function GamePage_result() {
  return (
    <div className="Background">
      <div className="Layout">
        <div className="Content">
          <div className="Result">
            <div className="Result_main">
              <div className="guitar">뭐를 넣어야 할까요??</div>
              <div className="CountText">
                <span className="Score">
                  <b>?개 - 이거 어케 하는거지 </b>
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
