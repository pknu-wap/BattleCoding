import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import InputInfo from './InputInfo';
import './UserInputForm.scss';
import axios from "axios";

const UserInputForm = () => {
    const [info, setInfo] = useState({
        nickname: '',
        email: '',
        password: '',
        isValidNickname: false,
        isValidPwd: false,
        isValidPwdChk: false,
    });

    const [isValidButton, setIsValidButton] = useState(false);
    const navigate = useNavigate();

    const infoHandler = (key, value) => {
        setInfo(prevState => {
            return {
                ...prevState,
                [key]: value,
            };
        });
    };

    const validationHandler = useCallback((key, isValid) => {
        setInfo(prevState => {
            return {
                ...prevState,
                [key]: isValid,
            };
        });
    }, []);

    const submitHandler = async event => {
        event.preventDefault();

        const signupData = {
            email: info.email,
            password: info.password,
            nickname: info.nickname,
            provider: 'LOCAL',
            providerId: info.email
        };

        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/auth/signup`, signupData);

            if (response.data.success) {
                alert('회원가입이 완료되었습니다.');
                navigate('/auth/login');
            } else {
                alert(response.data.message);
            }
        } catch (error) {
            console.error('회원가입 중 오류 발생:', error);
            alert('서버와 통신 중 문제가 발생했습니다.');
        }
        console.log('Submitting form:', info);
    }

    useEffect(() => {
        setIsValidButton(info.isValidNickname && info.isValidPwd && info.isValidPwdChk);
    }, [info.isValidNickname, info.isValidPwd, info.isValidPwdChk]);

    return (
        <form className="regsiterSubmitForm" onSubmit={submitHandler}>
            <div className="inputArea">
                <div className='formWrapper'>
                    <InputInfo onChange={infoHandler} OnChangeValidation={validationHandler} />
                </div>
            </div>
            <button disabled={!isValidButton}>회원가입</button>
        </form>
    );
};

export default UserInputForm;

