import { useEffect, useState } from "react";
import { getRandomQuestionByType } from "../../../../api/questionApi";
import "./GamePage_question.css";

function GamePage_question() {
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answer, setAnswer] = useState("");

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const data = await getRandomQuestionByType({
          type: "FILL_IN_BLANK",
          count: 10,
        });
        setQuestions(data);
      }
      catch (err) {
        alert(err.message);
      }
    };

    fetchQuestions();
  }, []);

  if (questions.length === 0) {
    return <div className="Matter">문제를 불러오는 중...</div>
  }

  const currentQuestion = questions[currentIndex];

  const handleSubmit = () => {
    console.log("입력한 정답: ", answer);
    setAnswer("");
    setCurrentIndex((prev) => prev + 1);
  }

  return (
    <div className="PageBackground">
      <div className="PageLayout">
        <div className="QuestionContent">
          <div className="Question_main">
            <div className="Matter_main">
              <div className="Matter">{currentQuestion.question}</div>
            </div>
            <div className="Enter_main">
              <span className="Enter_input">
                <input 
                  aria-label="정답창"
                  placeholder="정답을 입력해주세요." 
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                />
                <button className="Enter_button" onClick={handleSubmit}>🕹️</button>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GamePage_question;
