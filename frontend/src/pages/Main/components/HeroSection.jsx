
import { useNavigate } from 'react-router-dom';
import './HeroSection.scss';
import { useEffect, useState } from 'react';

export default function HeroSection() {
    const navigate = useNavigate();
    /*const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        setIsLoggedIn(!token);
    }, []);

    const handleClick = () => {
        if (isLoggedIn) {
            navigate('/game/user');
        }
        else {
            navigate('/game/guest');
        }
    }; */

    return (
        <section className='hero'>
            <div className='heroInner'>
                <h1 className='heroTitle'>Battle Coding</h1>
                <p className='heroSubtitle'>
                    <span className="heroHighlight">
                        게임처럼 즐기며 실력을 키우는 코딩 플랫폼
                    </span>
                    <span className="heroSubtext">
                        문제를 풀며 티어와 랭킹을 올려보세요!
                    </span>
                </p>
                <div className='heroBtn'>
                    <button
                        onClick={() => navigate('/game/user')}>지금 시작하기</button>
                </div>
            </div>
        </section>
    )
}