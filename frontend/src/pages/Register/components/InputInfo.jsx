import { useState, useEffect } from "react";
import api from "../../../api/api";
import './InputInfo.scss';

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const pwdRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*])[a-zA-Z\d!@#$%^&*]{8,20}$/;

const allowedspecials = "!@#$%^&*";
const forbiddenspecials = /[^a-zA-Z0-9!@#$%^&*]/;

const InputInfo = ({ onChange, OnChangeValidation }) => {
    const [inputData, setInputData] = useState({
        nickname: "",
        email: "",
        password: "",
        passwordCheck: "",
    });

    const [isLengthValid, setIsLengthValid] = useState({
        nickname: false,
        email: false,
        password: false,
        passwordCheck: false,
    });

    const [isAvailable, setIsAvailable] = useState({
      nickname: false,
      email: false,
    });

    const checkNickname = async (nickname) => {
      try {
        const res = await api.get(`/user/check-nickname`, { params: { nickname } });
        console.log("[닉네임 체크 응답]", nickname, "→", res.data);
        return res.data === true;
      } catch (err) {
        console.error("[닉네임 체크 에러]", err);
        return false;
      }
    };

    const checkEmail = async (email) => {
      try {
        const res = await api.get(`/user/check-email`, { params: { email } });
        console.log("[이메일 체크 응답]", email, "→", res.data);
        return res.data === true;
      } catch (err) {
        console.error("[이메일 체크 에러]", err);
        return false;
      }
    };

    useEffect(() => {
      const match = inputData.passwordCheck.length > 0 && inputData.password === inputData.passwordCheck;
      setIsLengthValid(prev => ({ ...prev, passwordCheck: match }));
    }, [inputData.password, inputData.passwordCheck]);

    useEffect(() => {
      const nicknameValid = isLengthValid.nickname && isAvailable.nickname;
      const emailValid = isLengthValid.email && isAvailable.email;

      OnChangeValidation("isValidNickname", nicknameValid);
      OnChangeValidation("isValidPwd", isLengthValid.password);
      OnChangeValidation("isValidPwdChk", isLengthValid.passwordCheck);
    },[isLengthValid, isAvailable, OnChangeValidation]);

    const [pwdErrMsg, setPwdErrMsg] = useState("");
    
    const inputHandler = async (e) => {
        const { name, value } = e.target;
        setInputData((prev) => ({ ...prev, [name]: value }));
        onChange(name, value);

        if (name === "nickname") {
          const lengthValid = value.length >= 4 && value.length <= 12;
          setIsLengthValid(prev => ({ ...prev, nickname: lengthValid }));
          if (lengthValid) {
            const available = await checkNickname(value);
            setIsAvailable(prev => ({ ...prev, nickname: available }));
          } else {
            setIsAvailable(prev => ({ ...prev, nickname: false }));
          }
        }

        if (name === "email") {
          const formatValid = emailRegex.test(value);
          setIsLengthValid(prev => ({ ...prev, email: formatValid }));
          if (formatValid) {
            const available = await checkEmail(value);
            setIsAvailable(prev => ({ ...prev, email: available }));
          } else {
            setIsAvailable(prev => ({ ...prev, email: false }));
          }
        }

        if (name === "password") {
          const containsForbidden = forbiddenspecials.test(value);
          const pwdValid = pwdRegex.test(value);

          if (containsForbidden) {
            setIsLengthValid(prev => ({
              ...prev,
              password: false,
              passwordCheck: inputData.passwordCheck === value,
            }));
            setPwdErrMsg("사용할 수 없는 특수문자가 포함되어 있습니다.");
          }
          else if (!pwdValid) {
            setIsLengthValid(prev => ({
              ...prev,
              password: false,
              passwordCheck: inputData.passwordCheck === value,
            }));
            setPwdErrMsg("비밀번호는 영문, 숫자, 특수문자 조합 8~20자여야 합니다.\n(사용 가능한 특수문자: !@#$%^&*)");          
          }
          else {
            setIsLengthValid(prev => ({
              ...prev,
              password: true,
              passwordCheck: inputData.passwordCheck === value,
            }));
            setPwdErrMsg("사용 가능한 비밀번호입니다.");
          }
        }

        if (name === "passwordCheck") {
          const match = inputData.password === value;
          setIsLengthValid(prev => ({ ...prev, passwordCheck: match }));
        }
    };
    
    return (
        <>
          <div className="inputForm">
            <div className="inputField">
              <label htmlFor="nickname">닉네임</label>
              <div className="inputInfo">
                <i className="fa-solid fa-user icon" />
                <input {...INPUT_FIELDS[0]} value={inputData.nickname} onChange={inputHandler} />
              </div>
              <p className={inputData.nickname ? (isLengthValid.nickname && isAvailable.nickname ? "valid" : "invalid") : "placeholder"}>
                {inputData.nickname
                  ? !isLengthValid.nickname
                    ? "닉네임은 4~12자로 입력해 주세요."
                    : !isAvailable.nickname
                    ? "이미 사용 중인 닉네임입니다."
                    : "사용 가능한 닉네임입니다."
                  : " "}
              </p>
            </div>

            <div className="inputField">
              <label htmlFor="email">이메일</label>
              <div className="inputInfo">
                <i className="fa-solid fa-envelope icon" />
                <input {...INPUT_FIELDS[1]} value={inputData.email} onChange={inputHandler} />
              </div>
              <p className={inputData.email ? (isLengthValid.email && isAvailable.email ? "valid" : "invalid") : "placeholder"}>
                {inputData.email
                  ? !isLengthValid.email
                    ? "올바른 이메일 주소를 입력해 주세요."
                    : !isAvailable.email
                    ? "이미 사용 중인 이메일입니다."
                    : "사용 가능한 이메일입니다."
                  : " "}
              </p>
            </div>

            <div className="inputField">
              <label htmlFor="password">비밀번호</label>
              <div className="inputInfo">
                <i className="fa-solid fa-lock icon" />
                <input {...INPUT_FIELDS[2]} value={inputData.password} onChange={inputHandler} />
              </div>
              <p className={inputData.password ? (isLengthValid.password ? "valid" : "invalid") : "placeholder"}>
                {inputData.password ? (
                  <>
                    {pwdErrMsg.split("\n").map((line, index) => (
                      <span key={index}>
                        {line}
                        <br />
                      </span>
                    ))}
                  </>
                ) : " "}
              </p>
            </div>

            <div className="inputField">
              <label htmlFor="passwordCheck">비밀번호 확인</label>
              <div className="inputInfo">
                <i className="fa-solid fa-lock icon" />
                <input {...INPUT_FIELDS[3]} value={inputData.passwordCheck} onChange={inputHandler} />
              </div>
              <p className={inputData.passwordCheck ? (isLengthValid.passwordCheck ? "valid" : "invalid") : "placeholder"}>
                {inputData.passwordCheck
                  ? isLengthValid.passwordCheck
                    ? "비밀번호가 일치합니다."
                    : "비밀번호를 한 번 더 입력해 주세요."
                  : " "}
              </p>
            </div>
          </div>
        </>
    );
};

const INPUT_FIELDS = [
  { id: 1, name: "nickname", placeholder: "닉네임", type: "text" },
  { id: 2, name: "email", placeholder: "이메일", type: "text" },
  { id: 3, name: "password", placeholder: "비밀번호", type: "password" },
  { id: 4, name: "passwordCheck", placeholder: "비밀번호 확인", type: "password" },
];

export default InputInfo;