import React from "react";
import "./Game_page.css";
import PlayHeader from "./PageHeader/PagePlayHeader";
import Question from "./QuestionPage/GamePage_question";

function PageQuestion() {
  return (
    <div className="Game_Page">
      <PlayHeader />
      <Question />
    </div>
  );
}

export default PageQuestion;
