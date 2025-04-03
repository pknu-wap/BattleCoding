import { useNavigate } from 'react-router-dom';
import LoginInputForm from './components/LoginInputForm';
import './Login.scss';

const Login = () => {
    const navigate = useNavigate();

    const buttonHandler = event => {
        navigate('/register');
    };

    return (
        <>
            <div className='login'>
                <div className='loginCard'>
                    <div className='loginContainer'>
                        <div className='logoArea'>
                            <h1 className='loginTitle'>Battle Coding</h1>
                        </div>
                        <div className='formArea'>
                            <LoginInputForm />
                            <button className='registerBtn' onClick={buttonHandler}>회원가입</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;