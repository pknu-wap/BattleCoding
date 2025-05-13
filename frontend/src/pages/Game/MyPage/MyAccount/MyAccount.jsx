import React from "react";
import { useNavigate } from "react-router-dom";
import "./MyAccount.scss";

function MyAccount() {
  const navigate = useNavigate();

  return (
    <div className="myAccount">
      <div className="myImage">
        <img
          className="profileImage"
          alt="프로필 사진"
          src="https://search.pstatic.net/sunny/?src=https%3A%2F%2Fyt3.googleusercontent.com%2Fytc%2FAIdro_lID9IEcsQjGr44894Ha1y2gjAmMzAl9Cp1mQKNDfbJmg%3Ds900-c-k-c0x00ffffff-no-rj&type=sc960_832"
        />
      </div>
      <div className="myInfo">
        <div className="myName">
          <span className="myNickname">NICKNAME</span>
          <span className="myEmail">my email</span>
        </div>
        <div className="myBtn">
          <button className="changeBtn" onClick={() => navigate('/mypage/edit')}>Edit Profile</button>
        </div>
      </div>
    </div>
  );
}

export default MyAccount;
