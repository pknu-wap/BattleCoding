import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import api from "../../api/api";
import "./Navbar.scss";


export default function Navbar({ type = "main" }) {
  const navigate = useNavigate();
  const location = useLocation();

  const [nickname, setNickname] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const isMainPage = location.pathname === "/";

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      setIsAuthenticated(false);
      return;
    }

    const fetchUserInfo = async () => {
      try {
        const res = await api.get("/user/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setNickname(res.data.nickname || "사용자");
        setIsAuthenticated(true);
      } catch (err) {
        console.error("닉네임 가져오기 실패", err);
        setIsAuthenticated(false);
        setNickname("");

        if (err?.response?.status === 401) {
          setTimeout(() => {
            alert("로그인 세션이 만료되었습니다. 다시 로그인해 주세요.");
            navigate("/auth/login");
          }, 300);
        }
      }
    };

    fetchUserInfo();
  }, [token]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    setNickname("");
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
          {isAuthenticated && isMainPage && (
            <div className="greetingText">{nickname}님, 반갑습니다!</div>
          )}
          {isAuthenticated ? (
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