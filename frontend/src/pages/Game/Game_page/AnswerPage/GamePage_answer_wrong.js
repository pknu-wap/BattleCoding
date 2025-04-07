import "./GamePage_answer.css";

function GamePage_answer() {
  return (
    <div className="PageBackground">
      <div className="PageLayout">
        <div className="AnswerContent">
          <div className="Answer_main">
            <div className="Explan_main">
              <div className="Explan">정답</div>
            </div>
            <div className="AnswerText">
              <div className="Answer_Wrong">
                <span className="Wrong">
                  <b className="No">오답</b>입니다ㅠㅠ😢
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GamePage_answer;
