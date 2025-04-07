import UserInputForm from './components/UserInputForm'
import './Register.scss';

const Register = () => {
    return (
        <div className="register">
            <section className='registerCard'>
                <div className='registerContainer'>
                    <div className='logoArea'>
                        <h1 className='registerTitle'>회원가입</h1>
                    </div>
                    <div className='formArea'>
                        <UserInputForm />
                    </div>
                </div>
            </section>
        </div>
     );
}

export default Register;