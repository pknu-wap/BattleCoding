import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import api from '../../../../api/api';
import Navbar from "../../../Navbar/Navbar";
import "./MiniGame_Four_ready.scss";

function MiniGameFourReady() {
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
        alert("로그인이 필요합니다.");
        navigate("/auth/login");
        }
    }, [navigate]);

    const image = "https://res.cloudinary.com/dcvhzjuzc/image/upload/v1747964691/image1_lc80ck.png";

    const handleStart = () => {
        navigate("/game/question", {
            state: {
                mode: "mini",
                type: "WORD_CHAIN",
                isRanking: false,
                title: "네 글자 퀴즈",
                description: `앞 글자를 이어가는 네 글자 단어 퀴즈입니다`,
                image,
            },
        });
    };

    return (
        <>
            <Navbar type="user" />
            <div className="miniMain">
                <div className="floatingWords">
                    <span className="word word1">정답</span>
                    <span className="word word2">단어</span>
                    <span className="word word3">맞추기</span>
                    <span className="word word4">퀴즈</span>
                </div>
                
                <div className="miniContent">
                    <div className="miniIntro">
                        <p className="miniHeading">
                            <span className="highlight">네 글자 퀴즈</span>를 시작해 볼까요?
                        </p>
                        <p className="miniSubtext">코딩 쉬는 시간, 짧고 재밌는 단어 이어 말하기 게임 한 판 어때요?</p>
                    </div>

                    <div className="ruleSection">
                        <h3>게임 규칙</h3>
                        <p>네 글자 단어의 <strong>앞 두 글자</strong>가 주어지면 <strong>나머지 네 글자 단어</strong>를 이어서 작성해 주세요.</p>
                        <p>ex) 허리 → 케인</p>
                        <p>빈칸에 들어갈 글자만 입력하면 정답으로 인정됩니다.</p>
                    </div>

                    <div className="btnSection">
                        <button className="startBtn" onClick={handleStart}>시작하기</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default MiniGameFourReady;