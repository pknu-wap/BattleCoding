import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import api from "../../api/api";
import "./Navbar.scss";


export default function Navbar({ type = "main" }) {
  const navigate = useNavigate();
  const location = useLocation();

  const [nickname, setNickname] = useState("");

  const isLoggedIn = localStorage.getItem("token") !== null;
  const isMainPage = location.pathname === "/";

  useEffect(() => {
    const fetchNickname = async () => {
      if (!isLoggedIn) return;
      try {
        const res = await api.get("/user/me");
        setNickname(res.data.nickname || "사용자");
      } catch (err) {
        console.error("닉네임 가져오기 실패", err);
      }
    };
    fetchNickname();
  }, [isLoggedIn]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    alert("로그아웃 되었습니다.");
    navigate("/");
  };

  return (
    <nav className="navbar">
      <div className="navbarInner">
        <div className="navbarLeft">
          <div className="navbarLogo" onClick={() => navigate("/")}>
            Battle Coding
          </div>

          {(type === "main" || type === "user") && (
            <div className="navbarMenu">
              <button onClick={() => navigate("/game")}>Quizzes</button>
              <button onClick={() => navigate("/ranking")}>Ranking</button>
            </div>
          )}
        </div>

        <div className="navbarAuth">
          {isLoggedIn && isMainPage && (
            <div className="greetingText">{nickname}님, 반갑습니다!</div>
          )}
          {isLoggedIn ? (
            <>
              <button className="btnMypage" onClick={() => navigate("/mypage")}>
                마이페이지
              </button>
              <button className="btnLogout" onClick={handleLogout}>
                로그아웃
              </button>
            </>
          ) : (
            <>
              <button className="btnLogin" onClick={() => navigate("/auth/login")}>
                로그인
              </button>
              <button className="btnRegister" onClick={() => navigate("/register")}>
                회원가입
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}