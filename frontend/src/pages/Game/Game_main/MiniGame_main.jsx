import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Navbar from "../../Navbar/Navbar";
import "./MiniGame_main.scss";
import GameCard from "./GameCard/GameCard";
import MiniCard_Data from "./GameCard/MiniCard_Data";

function MiniGameMain() {
  const navigate = useNavigate();
  const location = useLocation();
  const { isRanking } = location.state || {};

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("로그인이 필요합니다.");
      navigate("/auth/login");
    }
  }, [navigate]);

  return (
    <>
      <Navbar type="user" />
      <div className="gameMain">
        <div className="gameContent">
          <div className="quizIntro">
            <p className="quizHeading">
              <span className="highlight">미니 게임</span>을 풀어볼까요?
            </p>
            <p className="quizSubText">
              코딩 쉬는 시간! <br />
              짧고 유쾌한 게임 한 판 어때요?
            </p>
          </div>
          <div className="gameCards">
            {MiniCard_Data.length === 0 ? (
              <div className="Browsing">퀴즈가 없습니다.</div>
            ) : (
              MiniCard_Data.map((data, index) => (
                <GameCard
                  key={index}
                  image={data.image}
                  title={data.title}
                  description={data.description}
                  type={data.type}
                  difficulty={data.difficulty}
                  isRanking={isRanking}
                  typing={data.typing}
                  typingPosition={data.mini_typingPosition}
                  typingFontSize={data.typingFontSize}
                  isMini={true}
                />
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default MiniGameMain;
