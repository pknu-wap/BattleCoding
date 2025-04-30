import { useNavigate } from "react-router-dom";
import LoginInputForm from "./components/LoginInputForm";
import "./Login.scss";

const Login = () => {
  const navigate = useNavigate();

  const buttonHandler = (event) => {
    navigate("/register");
  };

  return (
    <>
      <div className="login">
        <h1 className="loginTitle">로그인</h1>
        <div className="formArea">
          <LoginInputForm />
          <button className="registerBtn" onClick={buttonHandler}>
            회원가입
          </button>
        </div>
      </div>
    </>
  );
};

export default Login;
