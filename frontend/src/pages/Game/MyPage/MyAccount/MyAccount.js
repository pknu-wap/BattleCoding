import React from "react";
import "./MyAccount.css";

function MyAccount() {
  return (
    <div className="MyAccount">
      <div className="MyImage">
        <img className="ProfileImage" alt="프로필 사진" src="" />
      </div>
      <div className="MY">
        <div className="MyName">
          <span className="MyNickname">NICKNAME</span>
          <span className="MyID">this is my ID</span>
        </div>
        <div className="MyButton">
          <button className="chageButton">chage profile</button>
          <button className="chageButton">chage password</button>
        </div>
      </div>
    </div>
  );
}

export default MyAccount;
