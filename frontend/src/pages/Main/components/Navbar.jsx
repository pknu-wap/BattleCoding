import { useNavigate } from 'react-router-dom';
import './Navbar.scss'

export default function Navbar() {
    const navigate = useNavigate();
    
    return (
        <nav className='navbar'>
            <div className='navbarInner'>
                <div className='navbarLeft'>
                    <div className='navbarLogo' onClick={() => navigate("/")}>Battle Coding</div>
                    <div className='navbarMenu'>
                        <a href='#'>Quizzes</a>
                        <a href='#'>Ranking</a>
                    </div>
                </div>
            </div>
            
            <div className='navbarAuth'>
                <button className='btnMypage' onClick={() => navigate('/user/mypage')}>마이페이지</button>
                <button className='btnLogin' onClick={() => navigate('/auth/login')}>로그인</button>
                <button className='btnRegister' onClick={() => navigate('/register')}>회원가입</button>
            </div>
        </nav>
    );
}