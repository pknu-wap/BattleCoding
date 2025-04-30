import { useNavigate } from 'react-router-dom';
import './Navbar_game.scss'

export default function Navbar({ type = "main" }) {
    const navigate = useNavigate();
    
    return (
        <nav className='navbarGame'>
            <div className='navbarGameInner'>
                <div className='navbarGameLeft'>
                    <div className='navbarGameLogo' onClick={() => navigate("/")}>Battle Coding</div>
                </div>
                <div className='navbarGameRight'>
                    <button className='exitButton' onClick={() => navigate('/game/user')}>나가기</button>
                </div>
            </div>
        </nav>
    );
}