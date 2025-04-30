import React from "react";
import "./Game_page.css";
import Navbar_game from "../../Navbar/Navbar_game";
import Question from "./QuestionPage/GamePage_question";

function PageQuestion() {
  return (
    <div className="Game_Page">
      <Navbar_game />
      <Question />
    </div>
  );
}

export default PageQuestion;
