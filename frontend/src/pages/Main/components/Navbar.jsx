import { useNavigate } from 'react-router-dom';
import './Navbar.scss'

export default function Navbar() {
    const navigate = useNavigate();
    
    return (
        <nav className='navbar'>
            <div className='navbarLogo'>Battle Coding</div>
            <div className='navbarMenu'>
                <a href='#'>Home</a>
                <a href='#'>Quizzes</a>
                <a href='#'>Ranking</a>
            </div>
            <div className='navbarAuth'>
                <button className='btnLogin' onClick={() => navigate('/auth/login')}>로그인</button>
                <button className='btnRegister' onClick={() => navigate('/register')}>회원가입</button>
            </div>
        </nav>
    )
}