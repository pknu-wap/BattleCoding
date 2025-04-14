import React from "react";
import "./MyAccount.css";

function MyAccount() {
  return (
    <div className="MyAccount">
      <div className="MyImage">
        <img
          className="ProfileImage"
          alt="프로필 사진"
          src="https://search.pstatic.net/sunny/?src=https%3A%2F%2Fyt3.googleusercontent.com%2Fytc%2FAIdro_lID9IEcsQjGr44894Ha1y2gjAmMzAl9Cp1mQKNDfbJmg%3Ds900-c-k-c0x00ffffff-no-rj&type=sc960_832"
        />
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
