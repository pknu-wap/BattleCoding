import React from "react";
import "./MyQuiz.scss";

function MyQuiz() {
  return (
    <div className="myQuiz">
      <div className="myQuestion">
        <span className="myAll">
          푼 문제<b className="Number">??</b> 개
        </span>
        <span className="myRight">
          <button className="rightQuiz">
            맞은 문제
          </button>
          <b className="Number">??</b> 개
        </span>
        <span className="myWrong">
          <button className="wrongQuiz">
            틀린 문제
          </button>
          <b className="Number">??</b> 개
        </span>
      </div>
    </div>
  );
}

export default MyQuiz;
