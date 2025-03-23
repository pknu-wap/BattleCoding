import UserInputForm from './components/UserInputForm'
import './Register.scss';

const Register = () => {
    return (
        <div className="register">
             <section className='registerForm'>
                 <h1 className='registerTitle'>회원가입</h1>
                 <UserInputForm />
             </section>
        </div>
     );
}

export default Register;