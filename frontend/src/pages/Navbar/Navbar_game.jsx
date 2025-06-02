import { useLocation, useNavigate } from "react-router-dom";
import "./Navbar_game.scss";

export default function Navbar({ type = "main", countdownText = "" }) {
  const navigate = useNavigate();
  const location = useLocation();
  const mode = location.state?.mode;

  /*   const handleExit = () => {
    switch (mode) {
      case "ranking":
        navigate("/game/ranking");
        break;
      case "practice":
        navigate("/game/practice");
        break;
      case "mini":
        navigate("/game/mini");
        break;
    }
  }; */

  return (
    <nav className="navbarGame">
      <div className="navbarGameInner">
        <div className="navbarGameLeft">
          <div className="navbarGameLogo" onClick={() => navigate("/")}>
            Battle Coding
          </div>
        </div>
        <div className="navbarGameRight">
          {countdownText && <div className="navbarCountdown">⏱ {countdownText}</div>}
          <button className="exitBtn" onClick={() => navigate("/")}>
            메 인
          </button>
        </div>
      </div>
    </nav>
  );
}
