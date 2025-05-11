import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginInputForm.scss';
import axios from "axios";
import api from '../../../api.js';

let regExpForEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
let regExpForPwd = /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+]).{8,16}$/;

const LoginInputForm = () => {
    const navigate = useNavigate();

    const [input, setInput] = useState({
        email: '',
        password: '',
    });

    const inputHandler = event => {
        const { name, value } = event.target;
        setInput(prevState => {
            return { ...prevState, [name]: value };
        });
    };

    const [isValidate, setIsValidate] = useState(false);

    const checkValidate = (email, pwd) => {
        const validation = regExpForEmail.test(email) && regExpForPwd.test(pwd);
        setIsValidate(validation);
    }

    useEffect(() => {
        checkValidate(input.email, input.password);
    }, [input.email, input.password]);

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
            <div className='inputArea'>
                <div className='formWrapper'>
                    <div className='EmailField'>
                        <label htmlFor='email'>이메일</label>
                        <input 
                            placeholder='이메일' 
                            name='email'
                            type='email'
                            onChange={inputHandler} 
                            value={input.email}
                        />
                    </div>
                    
                    <div className='PasswordField'>
                        <label htmlFor='password'>비밀번호</label>
                        <input
                            placeholder='비밀번호'
                            name='password'
                            type='password'
                            onChange={inputHandler}
                            value={input.password}
                        />
                    </div>
                </div>
            </div>
            
            <button disabled={!isValidate}>로그인</button>
        </form>
    );
};

export default LoginInputForm;