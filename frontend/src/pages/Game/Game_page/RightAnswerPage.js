import React from "react";
import Navbar_game from "../../Navbar/Navbar_game";
import RightAnswer from "./AnswerPage/GamePage_answer_right";

function PageAnswer() {
  return (
    <div className="Game_Page">
      <Navbar_game />
      <RightAnswer />
    </div>
  );
}

export default PageAnswer;
