import "./GamePage_question.css";

function GamePage_question() {
  return (
    <div className="PageBackground">
      <div className="PageLayout">
        <div className="QuestionContent">
          <div className="Question_main">
            <div className="Matter_main">
              <div className="Matter">문제보여주는 곳</div>
            </div>
            <div className="Enter_main">
              <span className="Enter_input">
                <input aria-label="정답창" placeholder="정답을 입력해주세요" />
                <button className="Enter_button">🕹️</button>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GamePage_question;
