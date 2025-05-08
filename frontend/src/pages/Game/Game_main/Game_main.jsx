import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Game_main.scss";
import Navbar from "../../Navbar/Navbar";
import GameCard from "./GameCard/GameCard";
import GameCard_Data from "./GameCard/GameCard_Data";

function GameMain() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("로그인이 필요합니다.")
      navigate('/auth/login');
    }
  }, []);
  
  return (
    <>
      <Navbar type="user" />
      <div className="gameMain">
        <div className="gameContent">
          <div className="quizIntro">
            <p className="quizHeading"><span className="highlight">어떤 유형의 문제</span>를 풀어볼까요?</p>
            <p className="quizSubText">
              다양한 유형의 문제를 풀며 <br />
              실력을 키우고 재미있게 코딩 실력을 높여보세요!
            </p>
          </div>
          <div className="gameCards">
            {GameCard_Data.length === 0 ? (
              <div className="Browsing">퀴즈가 없습니다.</div>
            ) : (
              GameCard_Data.map((data, index) => (
                <GameCard
                  key={index}
                  image={data.image}
                  title={data.title}
                  description={data.description}
                />
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default GameMain;
