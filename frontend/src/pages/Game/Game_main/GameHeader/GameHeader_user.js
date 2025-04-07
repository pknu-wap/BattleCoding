import "./GameHeader.css";
import LogoImage from "./Logo.png";

function GameHeader() {
  return (
    <header className="GameHeader">
      <div className="GameHeader_background">
        <div className="HeaderLayout">
          <img src={LogoImage} alt="Logo" className="LogoImage" />
          <div className="GameHeader_root">
            <button type="button" className="HeaderButton_log">
              로그아웃
            </button>
            <button type="button" className="HeaderButton_my">
              마이페이지
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

export default GameHeader;
