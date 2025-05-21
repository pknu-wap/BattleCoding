import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../../../api/api";
import "./MyAccount.scss";

function MyAccount() {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    nickname: "",
    email: ""
  });

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const res = await api.get("/user/me");

        setUser({
          nickname: res.data.nickname,
          email: res.data.email
        });
      } catch (err) {
        console.error("사용자 정보 요청 실패:", err);

        if (err.response?.status === 401) {
          alert("로그인이 필요합니다.");
          navigate("/login");
        }
      }
    };

    fetchUserInfo(); 
  }, [navigate]);

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
          <span className="myNickname">{user.nickname}</span>
          <span className="myEmail">{user.email}</span>
        </div>
        <div className="myBtn">
          <button className="changeBtn" onClick={() => navigate('/mypage/edit')}>사진 선택</button>
          <button className="changeBtn" onClick={() => navigate('/mypage/edit-info')}>정보 수정</button>
        </div>
      </div>
    </div>
  );
}

export default MyAccount;
