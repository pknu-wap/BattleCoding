import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ModeSelect.scss';
import Navbar from "../../Navbar/Navbar";

const ModeSelect = () => {
    const navigate = useNavigate();
    
    const handleSelectMode = (mode) => {
        switch (mode) {
            case "practice":
                navigate('/game/practice');
                break;
            case "ranking":
                navigate('/game/ranking');
                break;
            case "mini":
                navigate('/game/mini');
                break;
            default:
                break;
        }
    };

    return (
        <>
            <Navbar type='user' />
            <div className="modeSelectContainer">
                <div className="modeSelectWrapper">
                    <div className="modeCard" onClick={() => handleSelectMode("practice")}>
                        <img src="https://res.cloudinary.com/dcvhzjuzc/image/upload/v1747917703/image1_tsjj4x.png" className="modeImg" />
                        <div className="modeInfo">
                            <h2>연습 모드</h2>
                            <p>자유롭게 문제를 풀며 실력을 키워보세요!</p>
                        </div>
                    </div>

                    <div className="modeCard" onClick={() => handleSelectMode("ranking")}>
                        <img src="https://res.cloudinary.com/dcvhzjuzc/image/upload/v1747917798/image2_qxbncc.png" className="modeImg" />
                        <div className="modeInfo">
                            <h2>랭킹 모드</h2>
                            <p>다른 플레이어와 점수를 겨루며 경쟁하세요!</p>
                        </div>
                    </div>
                    
                    <div className='modeCard' onClick={() => handleSelectMode("mini")}>
                        <img src='https://res.cloudinary.com/dcvhzjuzc/image/upload/v1747918353/image3_jwouty.png' className='modeImg' />
                        <div className='modeInfo'>
                            <h2>미니 게임</h2>
                            <p>짧고 유쾌한 미니게임 한 판 어때요?</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ModeSelect;
