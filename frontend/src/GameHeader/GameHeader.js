import "./GameHeader.css";

function GameHeader() {
  return (
    <header className="GameHeader">
      <div className="GameHeader_background">
        <div className="HeaderLayout">
          <h3>Home</h3>
          <div className="GameHeader_root">
            <button type="button" className="HeaderButton_login">
              로그인
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

export default GameHeader;
