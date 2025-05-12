import { useNavigate } from "react-router-dom";
import LoginInputForm from "./components/LoginInputForm";
import logoImg from "../../../src/logo_BattleCoding.png";
import "./Login.scss";

const Login = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="loginContainer">
        <div className="loginWrapper">
          <section className="welcomeArea">
            <img src={logoImg} className="welcomeLogo" onClick={() => navigate('/')}/>
            <h2>Welcome Back!</h2>
            <p>아직 계정이 없으신가요?</p>
            <button className="welcomeBtn" onClick={() => navigate("/register")}>
              회원가입
            </button>
          </section>
          <section className="formArea">
            <h1>로그인</h1>
            <div className="formDivider" />
            <LoginInputForm />
          </section>
        </div>
      </div>
    </>
  );
};

export default Login;
