import React, { useState } from "react";
import Navbar_game from "../../Navbar/Navbar_game";
import Question from "./QuestionPage/GamePage_question.jsx";

function PageQuestion() {
  const [startCountdownText, setStartCountdownText] = useState("");
  const [questionCountdownText, setQuestionCountdownText] = useState("");  
  
  return (
    <div className="Game_Page">
      <Navbar_game countdownText={questionCountdownText} />
      <Question
        setStartCountdownText={setStartCountdownText}
        startCountdownText={startCountdownText}
        setCountdownText={setQuestionCountdownText}
        countdownText={questionCountdownText} 

      />
    </div>
  );
}

export default PageQuestion;
