import { useLocation, useNavigate } from 'react-router-dom';
import './Navbar_game.scss'

export default function Navbar({ type = "main" }) {
    const navigate = useNavigate();
    const location = useLocation();
    const isRanking = location.state?.isRanking;

    const handleExit = () => {
        if (isRanking) {
            navigate('/game/ranking');
        } else {
            navigate('/game/practice');
        }
    }
    
    return (
        <nav className='navbarGame'>
            <div className='navbarGameInner'>
                <div className='navbarGameLeft'>
                    <div className='navbarGameLogo' onClick={() => navigate("/")}>Battle Coding</div>
                </div>
                <div className='navbarGameRight'>
                    <button className='exitButton' onClick={handleExit}>나가기</button>
                </div>
            </div>
        </nav>
    );
}