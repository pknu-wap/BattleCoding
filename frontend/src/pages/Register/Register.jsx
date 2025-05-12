import { useNavigate } from "react-router-dom";
import UserInputForm from "./components/UserInputForm";
import logoImg from "../../../src/logo_BattleCoding.png";
import "./Register.scss";

const Register = () => {
  const navigate = useNavigate();

  return (
    <div className="registerContainer">
      <div className="registerWrapper">
        <section className="welcomeArea">
          <img src={logoImg} className="welcomeLogo" onClick={() => navigate("/")}/>
          <h2>Welcome!</h2>
          <p>이미 계정이 있으신가요?</p>
          <button className="welcomeBtn" onClick={() => navigate('/auth/login')}>로그인</button>
        </section>
        <section className="formArea">
          <h1>회원가입</h1>
          <div className="formDivider" />
          <UserInputForm />
        </section>
      </div>
    </div>
  );
};

export default Register;
