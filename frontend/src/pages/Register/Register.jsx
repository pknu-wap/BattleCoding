import UserInputForm from "./components/UserInputForm";
import "./Register.scss";

const Register = () => {
  return (
    <div className="register">
      <h1 className="registerTitle">회원가입</h1>
        <div className="formArea">
          <UserInputForm />
        </div>
    </div>
  );
};

export default Register;
