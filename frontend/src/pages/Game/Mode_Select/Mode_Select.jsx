import React from 'react';
import './Mode_Select.scss';
import { useNavigate } from 'react-router-dom';

const ModeSelect = () => {
    const navigate = useNavigate();
    return (
        <div className="mode-select-container">
        <div className="mode-card-wrapper">
            <div className="mode-card" onClick={() => navigate('/game')}>
            <img src="https://cdn.pixabay.com/photo/2015/06/24/15/45/code-820275_1280.jpg" alt="연습 모드" className="mode-image" />
            <div className="mode-info">
                <h2>연습 모드</h2>
                <p>자유롭게 플레이하며 게임에 익숙해질 수 있습니다.</p>
            </div>
            </div>

            <div className="mode-card" onClick={() => navigate('/game')}>
            <img src="https://cdn.pixabay.com/photo/2018/07/10/21/53/tournament-3529744_1280.jpg" alt="랭킹 모드" className="mode-image" />
            <div className="mode-info">
                <h2>랭킹 모드</h2>
                <p>다른 플레이어와 점수를 겨루며 경쟁하세요.</p>
            </div>
            </div>
        </div>
        </div>
    );
};

export default ModeSelect;
