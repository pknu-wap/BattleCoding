import { useState, useEffect } from "react";
import './InputInfo.scss';

const InputInfo = ({ onChange, OnChangeValidation }) => {
    const [inputData, setInputData] = useState({
        nickname: "",
        email: "",
        password: "",
        passwordCheck: "",
    });

    const [isValid, setIsValid] = useState({
        nickname: false,
        email: false,
        password: false,
        passwordCheck: false,
    });

    useEffect(() => {
        setIsValid((prev) => ({
            ...prev,
            passwordCheck: inputData.passwordCheck.length > 0 && inputData.password === inputData.passwordCheck,
        }));
    }, [inputData.password, inputData.passwordCheck]);

    const inputHandler = (event) => {
        const { name, value } = event.target;

        setInputData((prev) => ({ ...prev, [name]: value }));

        let isValidValue = false;

        if (name === "nickname") {
            isValidValue = value.length >= 4 && value.length <= 12;
            setIsValid((prev) => ({ ...prev, nickname: isValidValue }));
        }

        if (name === "email") {
            isValidValue = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
            setIsValid((prev) => ({ ...prev, email: isValidValue }));
        }

        if (name === "password") {
            isValidValue = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,16}$/.test(value);
            setIsValid((prev) => ({
                ...prev,
                password: isValidValue,
            }));
        }

        if (name === "passwordCheck") {
            isValidValue = inputData.password === value;
            setIsValid((prev) => ({ ...prev, passwordCheck: isValidValue }));
        }

        const validationMapping = {
            nickname: "isValidNickname",
            email: "isValidEmail",
            password: "isValidPwd",
            passwordCheck: "isValidPwdChk",
        };
    
        onChange(name, value);
        OnChangeValidation(validationMapping[name], isValidValue);
    };

    return (
        <>
            <input {...INPUT_FIELDS[0]} value={inputData.nickname} onChange={inputHandler} />
            {isValid.nickname && <p className="valid">사용 가능한 닉네임입니다.</p>}
            {!isValid.nickname && inputData.nickname && (
                <p className="invalid">닉네임은 4~12자 영문과 숫자로 입력해 주세요.</p>
                )}

            <input {...INPUT_FIELDS[1]} value={inputData.email} onChange={inputHandler} />
            {inputData.email && (
                isValid.email ? (
                    <p className="valid">올바른 이메일 형식입니다.</p>
                ) : (
                    <p className="invalid">올바른 이메일 주소를 입력해 주세요.</p>
                )
            )}

            <input {...INPUT_FIELDS[2]} value={inputData.password} onChange={inputHandler} />
            {isValid.password && <p className="valid">사용 가능한 비밀번호입니다.</p>}
            {!isValid.password && inputData.password && (
                <p className="invalid">비밀번호는 영문, 숫자, 특수문자를 포함해 8~16자로 입력해 주세요.</p>
            )}

            <input {...INPUT_FIELDS[3]} value={inputData.passwordCheck} onChange={inputHandler} />
            {inputData.passwordCheck.length > 0 && isValid.passwordCheck && (
                <p className="valid">비밀번호가 일치합니다.</p>
            )}
            {!isValid.passwordCheck && inputData.passwordCheck && (
                <p className="invalid">비밀번호를 한 번 더 입력해 주세요.</p>
            )}
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