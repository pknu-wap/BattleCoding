import React from "react";
import "./Game_page.css";
import PlayHeader from "./PageHeader/PagePlayHeader";
import RightAnswer from "./AnswerPage/GamePage_answer_right";

function PageAnswer() {
  return (
    <div className="Game_Page">
      <PlayHeader />
      <RightAnswer />
    </div>
  );
}

export default PageAnswer;
