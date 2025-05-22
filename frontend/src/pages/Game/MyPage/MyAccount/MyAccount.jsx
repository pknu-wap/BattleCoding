import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../../../api/api";
import "./MyAccount.scss";

function MyAccount() {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    nickname: "",
    email: "",
    profileImage: "",
  });

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const res = await api.get("/user/me");

        const { nickname, email, profileImage } = res.data;

        if (!profileImage) {
          const imageRes = await api.get("/user/profile/images");
          const imageList = imageRes.data;
          const defaultImage = imageList[0];

          await api.put("/user/profile/image", {
            profileImage: defaultImage,
          });

          const updated = await api.get("/user/me");

          setUser({
            nickname: updated.data.nickname,
            email: updated.data.email,
            profileImage: updated.data.profileImage,
          });
          
        } else {
          setUser({ nickname, email, profileImage });
        }

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
          src={user.profileImage}
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
