import React from "react";
import "./Game_page.css";
import Navbar_game from "../../Navbar/Navbar_game";
import WrongAnswer from "./AnswerPage/GamePage_answer_wrong";

function PageAnswer() {
  return (
    <div className="Game_Page">
      <Navbar_game />
      <WrongAnswer />
    </div>
  );
}

export default PageAnswer;
