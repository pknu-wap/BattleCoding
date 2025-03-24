import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import InputInfo from './InputInfo';
import './UserInputForm.scss';

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

    const submitHandler = event => {
        event.preventDefault();
        console.log('Submitting form:', info);
    }

    useEffect(() => {
        setIsValidButton(info.isValidNickname && info.isValidPwd && info.isValidPwdChk);
    }, [info.isValidNickname, info.isValidPwd, info.isValidPwdChk]);

    return (
        <form className="regsiterSubmitForm" onSubmit={submitHandler}>
            <InputInfo onChange={infoHandler} OnChangeValidation={validationHandler} />
            <button disabled={!isValidButton}>회원가입</button>
        </form>
    );
};

export default UserInputForm;

