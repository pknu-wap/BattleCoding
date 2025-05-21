import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../Navbar/Navbar";
import api from "../../../api/api";
import "./RankingGame_main.scss";

function RankingGameMain() {
    const navigate = useNavigate();
    
    const [userInfo, setUserInfo] = useState({
        nickname: "",
        xp: 0,
        rank: 0,
        profileImg: "https://cdn.pixabay.com/photo/2025/04/30/03/22/popsicle-9568309_1280.jpg"
    });

    const token = localStorage.getItem("token");
        if (!token) {
            alert("로그인이 필요합니다.");
            navigate("/auth/login");
        }

    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const [userRes, rankRes] = await Promise.all([
                    api.get("/user/me"),
                    api.get("/user/my-ranking"),
                ]);
                
                setUserInfo({
                    nickname: userRes.data.nickname,
                    xp: userRes.data.xp,
                    rank: rankRes.data.rank,
                    profileImg: userRes.data.profileImageUrl || "https://cdn.pixabay.com/photo/2025/04/30/03/22/popsicle-9568309_1280.jpg"
                });
            } catch (err) {
                console.error("유저 정보 오류", err);
            }
        };

        fetchUserInfo();
    }, [])

    const handleClick = () => {
        navigate('/game/question', {
            state: { isRanking: true }
        });
    };

    return (
        <>
            <Navbar type="user" />
            <div className="gameMain">
                <div className="quizIntro">
                    <h1 className="quizHeading"><span className="highlight">랭킹 모드</span>, 당신의 실력을 증명할 시간입니다!</h1>
                    <div className="quizSubText">
                        <p>지금 바로 도전해보세요!</p>
                        <p>당신의 이름을 <strong>랭킹</strong>에 올릴 차례입니다.</p>
                    </div>
                </div>

                <div className="profileSection">
                    <img src={userInfo.profileImg} className="profileImg" />
                    <div className="userInfo">
                        <div className="nickname">{userInfo.nickname}</div>
                        <div className="stats">
                            <div className="xp">{userInfo.xp} XP</div>
                            <div className="rank">{userInfo.rank}등</div>
                        </div>
                    </div>
                </div>

                <div className="ruleSection">
                    <h3>랭킹 모드 안내</h3>
                    <p><strong>총 10문제</strong>가 출제되며 <strong>모든 유형의 문제</strong>가 무작위로 혼합되어 등장합니다.</p>
                    <p>연습 모드에서는 볼 수 없는 <strong>전용 문제</strong>도 포함됩니다.</p>
                    <p>문제를 맞힐수록 <strong>XP가 증가</strong>하며 더 빠르게 풀수록 <strong>보너스 XP</strong>를 획득할 수 있습니다.</p>
                    <p>누적된 XP는 <strong>실시간 랭킹</strong>에 즉시 반영되어 상위 랭커에 도전할 수 있는 기회가 됩니다.</p>
                </div>
                
                <div className="btnSection">
                    <button className="startBtn" onClick={handleClick}>시작하기</button>
                </div>
            </div>
        </> 
    )
}

export default RankingGameMain;