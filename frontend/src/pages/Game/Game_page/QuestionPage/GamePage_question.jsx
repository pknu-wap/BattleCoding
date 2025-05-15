import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import api from "../../../../api";
import { getRandomQuestionByTypeAndDifficulty } from "../../../../api/questionApi";
import "./GamePage_question.scss";

function GamePage_question() {
  const navigate = useNavigate();
  const location = useLocation();
  const { type, difficulty, image, title, description } = location.state || {};

  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answer, setAnswer] = useState("");
  const [score, setScore] = useState(0);
  const [isRanking, setIsRanking] = useState(null);

  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState("");
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [startTime, setStartTime] = useState(Date.now());

  const [xpEarned, setXpEarned] = useState(0);
  const [updatedXp, setUpdatedXp] = useState(0);

  useEffect(() => {
    if (!type || !difficulty) {
      alert("문제 유형과 난이도 정보가 없습니다.");
      navigate('/game');
    }
  }, [type, difficulty, navigate]);

  useEffect(() => {
    if (isRanking === null) return;

    const fetchQuestions = async () => {
      try {
        const data = await getRandomQuestionByTypeAndDifficulty({
          type,
          difficulty,
          count: 10,
        });
        console.log("받아온 데이터:", data);
        setQuestions(data);
      } catch (err) {
        console.error("에러:", err);
        if (err?.response?.status === 401) {
          alert("로그인이 필요합니다.");
          navigate("/auth/login");
        } else {
          alert("문제를 불러오는 중 오류가 발생했습니다.");
          navigate("/game");
        }
      }
    };

    fetchQuestions();
  }, [type, difficulty, navigate, isRanking]);

  useEffect(() => {
    setStartTime(Date.now());
  }, [currentIndex]);

  useEffect(() => {
    if (questions.length > 0 && currentIndex >= questions.length) {
      navigate('/game/result', {
        state: { image, title, description, type, difficulty, score, isRanking }
      });
    }
  }, [currentIndex, questions.length, navigate, image, title, description, type, difficulty, score, isRanking]);
  
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Enter" && !isRanking && showFeedback) {
        e.preventDefault(); 
        handleNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isRanking, showFeedback]);
  
  const submitAnswer = async (questionId, userAnswer) => {
    const endTime = Date.now();
    const timeTaken = isRanking ? Math.floor((endTime - startTime) / 1000) : null;

    const response = await api.post("/submissions", {
      questionId,
      userAnswer,
      timeTaken,
      isRanking,
    });
    return response.data;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const question = questions[currentIndex];

    try {
      const result = await submitAnswer(question.id, answer);
      setIsCorrect(result.isCorrect);
      setCorrectAnswer(question.answers?.[0] || "");
      
      if (result.isCorrect) {
        setScore(prev => prev + 1);
      }

      if (isRanking) {
        setXpEarned(result.xpEarned || 0);
        setUpdatedXp(result.updatedXp || 0);
      } else {
        setXpEarned(0);
        setUpdatedXp(0);
      }

      if (isRanking) {
        setAnswer("");
        setCurrentIndex((prev) => prev + 1);
        return;
      }
      
      setShowFeedback(true);
    } catch (err) {
      console.error("제출 오류:", err);
      alert("제출 중 오류가 발생했습니다.");
    }
  };

  const handleNext = () => {
    setShowFeedback(false);
    setAnswer("");
    setCurrentIndex(prev => prev + 1);
  }

  const currentQuestion = questions[currentIndex];

  return (
    <form className="questionWrapper" onSubmit={handleSubmit}>
      {isRanking === null && (
        <div className="modeOverlay">
          <div className="modePopup">
            <h2>모드를 선택해 주세요</h2>
            <div className="modeBtns">
              <button onClick={() => setIsRanking(false)}>연습 모드</button>
              <button onClick={() => setIsRanking(true)}>랭킹 모드</button>
            </div>
          </div>
        </div>
      )}

      {isRanking !== null && currentQuestion && (
        <>
          <div className="questionSection">
            <div className="questionNumber">{currentIndex + 1} / {questions.length}</div>
            {currentQuestion.question ? (
              <div className="questionCard">{currentQuestion.question}</div>
            ) : currentQuestion.imageUrl ? (
              <img className="questionImage" src={currentQuestion.imageUrl} />
            ) : (
              <p style={{ color: "white" }}>문제가 없습니다.</p>
            )}
          </div>

          <div className={`answerSection ${showFeedback ? "feedbackMode" : "inputMode"}`}>
            {!showFeedback ? (
              <>
                <input
                  placeholder="정답을 입력해 주세요."
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  autoFocus
                />
                <button className="enterBtn" type="submit">🕹️</button>
              </>
            ): (
              <>
                <p className="feedbackText">{isCorrect ? "정답!" : "오답!"}</p>
                <p className="correctAnswer">{correctAnswer}</p>
                <button type="button" className="nextBtn" onClick={handleNext}>다음 문제</button>
              </>
            )}
          </div>
        </>
      )}
    </form>
  );
}

export default GamePage_question;
