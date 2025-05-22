import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import api from '../../../../api/api';
import Navbar from "../../../Navbar/Navbar";
import "./MiniGame_ready.scss";

function MiniGameReady() {
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
        alert("로그인이 필요합니다.");
        navigate("/auth/login");
        }
    }, [navigate]);

    const handleStart = () => {
        navigate("/game/question", {
            state: {
                type: "WORD_CHAIN",
                isRanking: false,
                title: "네 글자 이어말하기",
                description: `앞 글자를 이어가는 네 글자 단어 퀴즈입니다`,
            },
        });
    };

    return (
        <>
            <Navbar type="user" />
            <div className="miniMain">
                <div className="floatingWords">
                    <span className="word word1">코딩</span>
                    <span className="word word2">배틀</span>
                    <span className="word word3">단어</span>
                    <span className="word word4">게임</span>
                </div>
                
                <div className="miniContent">
                    <div className="miniIntro">
                        <p className="miniHeading">
                            <span className="highlight">미니 게임</span>을 시작해 볼까요?
                        </p>
                        <p className="miniSubtext">코딩 쉬는 시간, 짧고 유쾌한 단어 이어 말하기 게임 한 판 어때요?</p>
                    </div>

                    <div className="ruleSection">
                        <h3>게임 규칙</h3>
                        <p>4글자 단어의 <strong>마지막 두 글자</strong>로 시작하는 <strong>4글자 단어</strong>를 이어서 작성해 주세요.</p>
                        <p>ex) 컴퓨터 → 터널 → 널뛰기</p>
                        <p>단어가 끊기거나 잘못된 단어를 입력하면 틀립니다.</p>
                    </div>

                    <div className="btnSection">
                        <button className="startBtn" onClick={handleStart}>시작하기</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default MiniGameReady;