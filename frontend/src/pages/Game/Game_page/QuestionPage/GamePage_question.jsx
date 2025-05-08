import { useEffect, useState } from "react";
import { getRandomQuestionByType } from "../../../../api/questionApi";
import "./GamePage_question.css";
import {useNavigate} from "react-router-dom";

function GamePage_question() {
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answer, setAnswer] = useState("");
  const navigate = useNavigate(); // ✅ 추가

  // ✅ [1] 로그인 여부 확인
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/auth/login");
    }
  }, [navigate]);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const data = await getRandomQuestionByType({
          type: "FILL_IN_BLANK",
          count: 10,
        });
        console.log("받아온 데이터:", data);
        setQuestions(data);
      } catch (err) {
        console.error("에러:", err);
        alert(err.message);
      }
    };

    fetchQuestions();
  }, []);



  console.log("questions 상태:", questions);
  if (questions.length === 0) {
    return <div className="Matter">문제를 불러오는 중...</div>;
  }

  if (currentIndex >= questions.length) {
    return <div className="Matter">모든 문제를 풀었습니다!</div>;
  }

  const currentQuestion = questions[currentIndex];

  const handleSubmit = () => {
    console.log("입력한 정답: ", answer);
    setAnswer("");
    setCurrentIndex((prev) => prev + 1);
  };

  return (
    <div className="PageBackground">
      <div className="PageLayout">
        <div className="QuestionContent">
          <div className="Question_main">
            <div className="Matter_main">
              <div className="Matter">
                {currentQuestion.question ? (
                  <div>{currentQuestion.question}</div>
                ) : currentQuestion.imageUrl ? (
                  <img src={currentQuestion.imageUrl} alt="문제 이미지" />
                ) : (
                  <div>문제 없음</div>
                )}
              </div>
            </div>
            <div className="Enter_main">
              <span className="Enter_input">
                <input
                  aria-label="정답창"
                  placeholder="정답을 입력해주세요."
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                />
                <button className="Enter_button" onClick={handleSubmit}>
                  🕹️
                </button>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GamePage_question;
