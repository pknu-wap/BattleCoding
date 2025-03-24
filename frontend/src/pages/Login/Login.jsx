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
                <section className='loginForm'>
                    <h1 className='loginTitle'>로그인</h1>
                    <LoginInputForm />
                    <button className='registerBtn' onClick={buttonHandler}>아직 회원이 아니신가요?</button>
                </section>
            </div>
        </>
    );
};

export default Login;