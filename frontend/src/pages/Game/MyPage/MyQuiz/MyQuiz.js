import React from "react";
import "./MyQuiz.css";

function MyQuiz() {
  return (
    <div className="MyQuiz">
      <div className="MyQuestion">
        <span className="MyAll">
          푼 문제 수 <b>??</b> 개
        </span>
        <span className="MyRight">
          <button className="RightQuiz" type="button">
            맞춘 문제 확인
          </button>
          <b>??</b> 개
        </span>
        <span className="MyWrong">
          <button className="WrongQuiz" type="button">
            틀린 문제 확인
          </button>
          <b>??</b> 개
        </span>
      </div>
    </div>
  );
}

export default MyQuiz;
