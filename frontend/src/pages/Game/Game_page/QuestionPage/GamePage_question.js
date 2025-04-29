import "./GamePage_question.scss";

function GamePage_question() {
  return (
    <div className="pageBackground">
      <div className="questionSection">
        <div className="questionWrapper">
          <div className="matterSection">
            <div className="matter">문제 보여주는 곳</div>
          </div>
        </div>
      </div>

      <div className="enterSection"> 
          <input placeholder="정답을 입력해주세요" />
          <button className="btnEnter">🕹️</button>
        </div>
    </div>
  );
}

export default GamePage_question;
