import { useNavigate } from "react-router-dom";
import "./Navbar.scss";

export default function Navbar({ type = "main" }) {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("token") !== null;

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
              <a onClick={() => navigate("/game/user")}>Quizzes</a>
              <a onClick={() => navigate("/user/myrank")}>Ranking</a>
            </div>
          )}
        </div>

        <div className="navbarAuth">
          {isLoggedIn ? (
            <>
              <button className="btnMypage" onClick={() => navigate("/user/mypage")}>
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