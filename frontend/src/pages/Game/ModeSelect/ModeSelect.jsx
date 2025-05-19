import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ModeSelect.scss';
import Navbar from "../../Navbar/Navbar";

const ModeSelect = () => {
    const navigate = useNavigate();
    
    const handleSelectMode = (isRanking) => {
        if (isRanking) {
            navigate('/game/ranking');
        } else {
            navigate('/game/practice');
        }
    };

    return (
        <>
            <Navbar type='user' />
            <div className="modeSelectContainer">
                <div className="modeSelectWrapper">
                    <div className="modeCard" onClick={() => handleSelectMode(false)}>
                    <img src="https://cdn.pixabay.com/photo/2015/06/24/15/45/code-820275_1280.jpg" className="modeImg" />
                    <div className="modeInfo">
                        <h2>연습 모드</h2>
                        <p>자유롭게 문제를 풀며 실력을 키워보세요.</p>
                    </div>
                    </div>

                    <div className="modeCard" onClick={() => handleSelectMode(true)}>
                    <img src="https://cdn.pixabay.com/photo/2018/07/10/21/53/tournament-3529744_1280.jpg" className="modeImg" />
                    <div className="modeInfo">
                        <h2>랭킹 모드</h2>
                        <p>다른 플레이어와 점수를 겨루며 경쟁하세요.</p>
                    </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ModeSelect;
