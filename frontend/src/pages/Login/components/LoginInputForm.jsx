import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginInputForm.scss';
import api from '../../../api.js';

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const pwdRegex = /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+]).{8,16}$/;

const LoginInputForm = () => {
    const navigate = useNavigate();

    const [input, setInput] = useState({
        email: '',
        password: '',
    });

    const [capsLockOn, setCapsLockOn] = useState(false);
    const [isValidate, setIsValidate] = useState(false);

    const inputHandler = event => {
        const { name, value } = event.target;
        setInput(prevState => {
            return { ...prevState, [name]: value };
        });
    };

    const checkValidate = (email, pwd) => {
        const validation = emailRegex.test(email) && pwdRegex.test(pwd);
        setIsValidate(validation);
    };

    useEffect(() => {
        checkValidate(input.email, input.password);
    }, [input.email, input.password]);

    const handlePasswordKeyEvent = (e) => {
        setCapsLockOn(e.getModifierState("CapsLock"));
    };

    const handlePassWordBlur = () => {
        setCapsLockOn(false);
    };

    const getMyInfo = async () => {
        try {
            const response = await api.get("/user/me");
            console.log("내 정보:", response.data);
        } catch (error) {
            alert(error.response?.data?.message || "에러 발생");
        }
    };

    const loginHandler = async (event) => {
        event.preventDefault();
        
        const loginData = {
            email: input.email,
            password: input.password,
            provider: "LOCAL",
            providerId: input.email
        };

        try {
            const response = await api.post("/auth/login", loginData);

            if (response.data.success) {
                const token = response.data.token;
                localStorage.setItem("token", token);

                alert("로그인 되었습니다.");
                await getMyInfo();

                navigate("/");
            }      
            else {
                alert(response.data.message);
            } 
        }
        catch (error) {
            console.error(error)
            alert('로그인 중 오류가 발생하였습니다.');
        }
    };

    return (
        <form className='loginSubmitForm' onSubmit={loginHandler}>
            <div className="inputForm">
                <div className="inputField">
                    <label htmlFor="email">이메일</label>
                    <div className="inputInfo">
                        <i className="fa-solid fa-envelope icon" />
                        <input
                            type="email"
                            name="email"
                            value={input.email}
                            onChange={inputHandler}
                            placeholder="이메일" />
                    </div>
                </div>
                <div className="inputField">
                    <label htmlFor="password">비밀번호</label>
                    <div className="inputInfo">
                        <i className="fa-solid fa-lock icon" />
                        <input 
                            type="password" 
                            name="password" 
                            value={input.password} 
                            onChange={inputHandler} 
                            onKeyDown={handlePasswordKeyEvent}
                            onKeyUp={handlePasswordKeyEvent}
                            onBlur={handlePassWordBlur}
                            placeholder="비밀번호" />
                    </div>
                    <p className={capsLockOn ? "invalid" : "placeholder"}>
                        {capsLockOn ? "CapsLock이 켜져 있습니다." : " "}
                    </p>
                </div>
            </div>
            
            <div className='formDivider' />
            <button type="submit" disabled={!isValidate}>로그인</button>
        </form>
    );
};

export default LoginInputForm;