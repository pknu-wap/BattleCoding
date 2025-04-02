import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginInputForm.scss';
import axios from "axios";

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

    const loginHandler = async (event) => {
        event.preventDefault();
        
        try {
            const response = await axios.post('http://localhost:8080/auth/login', input);
            
            if (response.data.success) {
                alert('로그인되었습니다.');
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('nickname', response.data.nickname);
                // 로그인 후 이동할 경로 작성하기
            }      
            else {
                alert(response.data.message);
            } 
        }
        catch (error) {
            console.log('로그인 실패: ', error);
            alert('서버와의 연결에 실패하였습니다.');
        }
    };

    return (
        <form className='loginSubmitForm' onSubmit={loginHandler}>
            <input 
                placeholder='이메일' 
                name='email' 
                onChange={inputHandler} 
                value={input.email}
            />
            <input
                placeholder='비밀번호'
                name='password'
                type='password'
                onChange={inputHandler}
                value={input.password}
            />
            <button disabled={!isValidate}>로그인</button>
        </form>
    );
};

export default LoginInputForm;