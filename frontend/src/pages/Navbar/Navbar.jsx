import { useNavigate } from "react-router-dom";
import "./Navbar.scss";

export default function Navbar({ type = "main" }) {
  const navigate = useNavigate();

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
              <a href="#">Quizzes</a>
              <a href="#">Ranking</a>
            </div>
          )}
        </div>
      </div>

      <div className="navbarAuth">
        {type === "main" && (
          <>
            <button
              className="btnLogin"
              onClick={() => navigate("/auth/login")}
            >
              로그인
            </button>
            <button
              className="btnRegister"
              onClick={() => navigate("/register")}
            >
              회원가입
            </button>
          </>
        )}
        {type === "guest" && (
          <>
            <button
              className="btnLogin"
              onClick={() => navigate("/auth/login")}
            >
              로그인
            </button>
            <button
              className="btnRegister"
              onClick={() => navigate("/register")}
            >
              회원가입
            </button>
          </>
        )}
        {type === "user" && (
          <>
            <button
              className="btnMypage"
              onClick={() => navigate("/user/mypage")}
            >
              마이페이지
            </button>
            <button className="btnLogout" onClick={handleLogout}>
              로그아웃
            </button>
          </>
        )}
      </div>
    </nav>
  );
}
