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
              로그인
            </button>
            <button type="button" className="HeaderButton_my">
              회원가입
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

export default GameHeader;
