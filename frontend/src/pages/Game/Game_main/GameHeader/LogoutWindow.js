import React from "react";
import "./LogoutWindow.css";

function LogoutWindow({ yConfirm, nCancel }) {
  return (
    <div className="Window_Background">
      <div className="Window_Box">
        <span className="Window_Text">
          <b>로그아웃</b>하시겠습니까?
        </span>
        <div className="Window_Buttonlist">
          <button className="Yes_Button" onClick={yConfirm}>
            예
          </button>
          <button className="no_Button" onClick={nCancel}>
            아니오
          </button>
        </div>
      </div>
    </div>
  );
}

export default LogoutWindow;
