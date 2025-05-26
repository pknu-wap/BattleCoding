/* import "./GameCard.scss";
import { useNavigate } from "react-router-dom";

function GameCard({ image, title, description, type, isRanking }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/game/ready", {
      state: { image, title, description, type, isRanking }
    });
  };

  return (
    <div className="gameCard" onClick={handleClick}>
      <div className="gameCardCover">
        <img className="gameCardImage" src={image} alt={title} />
      </div>
      <div className="gameCardBody">
        <div className="gameCardTitle">{title}</div>
        <div
          className="gameCardElaborate"
          dangerouslySetInnerHTML={{ __html: description }}
        />
      </div>
    </div>
  );
}

export default GameCard;
 */

import "./GameCard.scss";
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect, useRef } from "react";

function GameCard({
  image,
  title,
  description,
  type,
  difficulty,
  isRanking,
  mode,
  typing = "",
  typingPosition = { top: "20%", left: "15%" },
  typingFontSize = "15px",
  isMini = false,
}) {
  const navigate = useNavigate();

  const [displayText, setDisplayText] = useState("");
  const [isHovered, setIsHovered] = useState(false);

  const indexRef = useRef(0);
  const timerRef = useRef(null);

  useEffect(() => {
    if (!typing) {
      setDisplayText("");
      return;
    }

    if (isHovered) {
      setDisplayText("");
      indexRef.current = 0;

      timerRef.current = setInterval(() => {
        setDisplayText((prev) => {
          const nextChar = typing.charAt(indexRef.current);
          indexRef.current += 1;

          if (indexRef.current >= typing.length) {
            clearInterval(timerRef.current);
          }

          return prev + nextChar;
        });
      }, 100);
    } else {
      setDisplayText("");
      clearInterval(timerRef.current);
    }

    return () => clearInterval(timerRef.current);
  }, [isHovered, typing]);

  const handleClick = () => {
    const miniMap = {
      WORD_CHAIN: "/game/ready/mini/four",
      GUESS_WHO: "/game/ready/mini/person",
    };

    let targetPath = "/game/ready"; 

    if (mode === "ranking") {
      targetPath = "/game/question";
    } else if (mode === "mini" && miniMap[type]) {
      targetPath = miniMap[type];
    }

    navigate(targetPath, {
      state: { image, title, description, type, difficulty, isRanking, mode },
    });
  };

  return (
    <div
      className="gameCard"
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="gameCardCover" style={{ position: "relative" }}>
        <img className="gameCardImage" src={image} alt={title} />
        <div
          className={isMini ? "mini_typingOverlay" : "typingOverlay"}
          style={{
            top: typingPosition.top,
            left: typingPosition.left,
            fontSize: typingFontSize,
          }}
        >
          {displayText}
        </div>
      </div>
      <div className="gameCardBody">
        <div className="gameCardTitle">{title}</div>
        <div className="gameCardElaborate" dangerouslySetInnerHTML={{ __html: description }} />
      </div>
    </div>
  );
}

export default GameCard;
