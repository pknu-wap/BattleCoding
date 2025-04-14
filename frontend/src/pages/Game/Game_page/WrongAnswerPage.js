import React from "react";
import "./Game_page.css";
import PlayHeader from "./PageHeader/PagePlayHeader";
import WrongAnswer from "./AnswerPage/GamePage_answer_wrong";

function PageAnswer() {
  return (
    <div className="Game_Page">
      <PlayHeader />
      <WrongAnswer />
    </div>
  );
}

export default PageAnswer;
