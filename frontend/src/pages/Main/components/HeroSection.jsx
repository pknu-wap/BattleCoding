import { useNavigate } from "react-router-dom";
import "./HeroSection.scss";
import Typed from "typed.js";
import developer from "../components/image1.png";
import HeroBack from "../components/HeroBack";
import { useEffect, useRef, useState } from "react";

export default function HeroSection() {
  const navigate = useNavigate();
  const firstLineRef = useRef(null);
  const secondLineRef = useRef(null);
  useEffect(() => {
    const firstTyped = new Typed(firstLineRef.current, {
      strings: ["게임처럼 즐기며 실력을 키우는 코딩 플랫폼"],
      typeSpeed: 80,
      showCursor: true,
      cursorChar: "_",
      onComplete: () => {
        setTimeout(() => {
          new Typed(secondLineRef.current, {
            strings: ["문제를 풀며 티어와 랭킹을 올려보세요!!!"],
            typeSpeed: 60,
            showCursor: true,
            cursorChar: "_",
            onComplete: () => {
              setTimeout(() => {
                const cursors = document.querySelectorAll(".typed-cursor");
                cursors.forEach((cursor) => cursor.remove());
              }, 2000);
            },
          });
        }, 250);
      },
    });

    return () => {
      firstTyped.destroy();
    };
  }, []);
  /*const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        setIsLoggedIn(!token);
    }, []); */

  return (
    <section className="hero">
      <HeroBack />
      <div className="heroInner">
        <div className="heroTextBlock">
          <h1 className="heroTitle">BATTLE CODING</h1>
          <p className="heroSubtitle">
            <span className="heroHighlight">
              <span ref={firstLineRef}></span>
            </span>
            <span className="heroSubtext">
              <span ref={secondLineRef}></span>
            </span>
          </p>

          <div className="heroBtn">
            <button onClick={() => navigate("/game/mode")}>지금 시작하기</button>
          </div>
        </div>
        <div className="heroImage">
          <img className="herobackImage" alt="backimage" src={developer} />
        </div>
      </div>
    </section>
  );
}
