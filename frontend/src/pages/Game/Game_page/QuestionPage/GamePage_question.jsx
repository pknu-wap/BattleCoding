import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { getRandomQuestionByTypeAndDifficulty } from "../../../../api/questionApi";
import "./GamePage_question.scss";

function GamePage_question() {
  const navigate = useNavigate();
  const location = useLocation();
  const { type, level } = location.state || {};

  const levelToDifficulty = {
    1: "EASY",
    2: "MEDIUM",
    3: "HARD",
  };

  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answer, setAnswer] = useState("");

  useEffect(() => {
    if (!type || !level) {
      alert("문제 유형과 난이도 정보가 없습니다.");
      navigate('/game');

      return;
    }

    const fetchQuestions = async () => {
      try {
        const difficulty = levelToDifficulty[level];
        const data = await getRandomQuestionByTypeAndDifficulty({
          type,
          difficulty,
          count: 10,
        });
        console.log("받아온 데이터:", data);
        setQuestions(data);
      } catch (err) {
        console.error("에러:", err);
        alert("로그인이 필요합니다.");
        navigate('/auth/login');
      }
    };

    fetchQuestions();
  }, [type, level, navigate]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (questions.length === 0) {
        alert("문제를 불러오는 중입니다...");
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, [questions]);

  useEffect(() => {
    if (questions.length > 0 && currentIndex >= questions.length) {
      alert("모든 문제를 다 풀었습니다! 🎉");
      navigate('/game/result', {
        state: {
          image: location.state?.image,
          title: location.state?.title,
          description: location.state?.description
        }
      });
    }
  }, [currentIndex, questions.length, navigate, location.state]);

  if (questions.length === 0 || currentIndex >= questions.length) {
    return null;
  }

  const currentQuestion = questions[currentIndex];

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("입력한 정답: ", answer);
    setAnswer("");
    setCurrentIndex((prev) => prev + 1);
  };

  return (
    <form className="questionWrapper" onSubmit={handleSubmit}>
      <div className="questionSection">
        <div className="questionNumber">
          {currentIndex + 1} / {questions.length}
        </div>
        {currentQuestion.question ? (
          <div className="questionCard">{currentQuestion.question}</div>
        ) : currentQuestion.imageUrl ? (
          <img 
            className="questionImage"
            src={currentQuestion.imageUrl}
            alt="문제 이미지"
          />
        ) : (
          <p>문제 없음</p>
        )}
      </div>

      <div className="answerSection">
        <input
          placeholder="정답을 입력해주세요."
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          autoFocus
        />
        <button className="enterBtn" type="submit">🕹️</button>
      </div>
    </form>
  );
}

export default GamePage_question;
