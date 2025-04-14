import React from "react";
import "./MyHeader.css";
import LogoImage from "./Logo.png";
import { useNavigate } from "react-router-dom";

function GameHeader() {
  const navigate = useNavigate();

  return (
    <header className="GameHeader">
      <div className="GameHeader_background">
        <div className="HeaderLayout">
          <img
            src={LogoImage}
            alt="Logo"
            className="LogoImage"
            onClick={() => navigate("/game/user")}
          />
          <div className="GameHeader_root">
            <button type="button" className="MyHeaderButton">
              ⚙️
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

export default GameHeader;
