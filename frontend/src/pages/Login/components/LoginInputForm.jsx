import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginInputForm.scss';

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

    const loginHandler = event => {
        event.preventDefault();
        console.log("login form:", input)
    };

    return (
        <form className='loginSubmitForm' onSubmit={loginHandler}>
            <input placeholder='이메일' name='email' onChange={inputHandler} />
            <input
                placeholder='비밀번호'
                name='password'
                type='password'
                onChange={inputHandler}
            />
            <button disabled={!isValidate}>로그인</button>
        </form>
    );
};

export default LoginInputForm;