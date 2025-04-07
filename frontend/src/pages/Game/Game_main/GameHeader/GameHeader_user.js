import "./GameHeader.css";
import LogoImage from "./Logo.png";
import LogoutWindow from "./LogoutWindow";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function GameHeader() {
  const navigate = useNavigate();
  const [showLogoutWindow, setShowLogoutWindow] = useState(false);

  const handleLogoutConfirm = () => {
    console.log("로그아웃 완료");
    setShowLogoutWindow(false);
    navigate("/game/guest");
  };

  const handleLogoutCancel = () => {
    setShowLogoutWindow(false);
  };

  return (
    <header className="GameHeader">
      <div className="GameHeader_background">
        <div className="HeaderLayout">
          <img src={LogoImage} alt="Logo" className="LogoImage" />
          <div className="GameHeader_root">
            <button
              type="button"
              className="HeaderButton_log"
              onClick={() => setShowLogoutWindow(true)}
            >
              로그아웃
            </button>
            <button
              type="button"
              className="HeaderButton_my"
              onClick={() => navigate("/user/mypage")}
            >
              마이페이지
            </button>
          </div>
        </div>
      </div>

      {showLogoutWindow && (
        <LogoutWindow
          yConfirm={handleLogoutConfirm}
          nCancel={handleLogoutCancel}
        />
      )}
    </header>
  );
}

export default GameHeader;
