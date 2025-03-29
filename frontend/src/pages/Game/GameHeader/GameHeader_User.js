import "./GameHeader.css";
import Logo from "./Logo.png";

function GameHeader() {
  return (
    <header className="GameHeader">
      <div className="GameHeader_background">
        <div className="HeaderLayout">
          <img src={Logo} alt="Logo" className="Logo" />
          <div className="GameHeader_root">
            <button type="button" className="HeaderButton_login">
              마이페이지
            </button>
            <button type="button" className="HeaderButton_login">
              로그아웃
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

export default GameHeader;
