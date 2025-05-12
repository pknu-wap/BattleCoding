import React from "react";
import "./MyQuiz.scss";

function MyQuiz() {
  return (
    <div className="myQuiz">
      <div className="myStats">통계</div>
        <div className="myQuestion">
          <span className="myAll">
            <span>풀이 개수</span>
            <span><b className="Number">??</b>개</span>
          </span>
          <span className="myRight">
            <span>정답 개수</span>
            <span><b className="Number">??</b>개</span>
          </span>
          <span className="myWrong">
            <span>오답 개수</span>
            <span><b className="Number">??</b>개</span>
          </span>
          <span className="myPercentage">
            <span>정답률</span>
            <span><b className="Number">??</b>%</span>
          </span>          
        </div>
    </div>
  );
}

export default MyQuiz;
