import "./PageHeader.css";
import LogoImage from "./Logo.png";
import { useNavigate } from "react-router-dom";

function GameHeader() {
  const navigate = useNavigate();

  const handleLogoClick = () => {
    const isLogin = localStorage.getItem("isLogin") === "true";
    if (isLogin) {
      navigate("/game/user");
    } else {
      navigate("/game/guest");
    }
  };

  return (
    <header className="GameHeader">
      <div className="GameHeader_background">
        <div className="HeaderLayout">
          <img src={LogoImage} alt="Logo" className="LogoImage" />
          <div className="GameHeader_root">
            <button
              type="button"
              className="HeaderButton"
              onClick={handleLogoClick}
            >
              나가기
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

export default GameHeader;
