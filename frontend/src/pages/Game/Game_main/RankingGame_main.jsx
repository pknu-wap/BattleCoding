import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../Navbar/Navbar";
import api from "../../../api/api";
import "./RankingGame_main.scss";

function RankingGameMain() {
    const navigate = useNavigate();

    const [nickname, setNickname] = useState("");
    const [xp, setXp] = useState(0);
    const [rank, setRank] = useState(0);
    const [profileImg, setProfileImg] = useState("https://cdn.pixabay.com/photo/2025/04/30/03/22/popsicle-9568309_1280.jpg");

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await api.get("/user/me");
                
                setNickname(res.data.nickname);
                setXp(res.data.xp);
                setRank(res.data.rank);
                setProfileImg(res.data.profileImageUrl || "https://cdn.pixabay.com/photo/2025/04/30/03/22/popsicle-9568309_1280.jpg");
            } catch (err) {
                console.error("유저 정보 오류", err);
            }
        };
        fetchUser();
    }, [])

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            alert("로그인이 필요합니다.");
            navigate("/auth/login");
        }
    }, [navigate]);

    return (
        <>
            <Navbar type="user" />
            <div className="gameMain">
                <div className="quizIntro">
                    <p className="quizHeading"><span className="highlight">랭킹 모드</span>에 도전해 보세요!</p>
                    <p className="quizSubText">10문제 한정! 점수 경쟁으로 실력을 겨뤄보세요.</p>
                </div>  
                <div className="userSummary">
                    <img src={profileImg} className="profileImg" />
                    <div className="userInfo">
                        <div className="nickname">{nickname}</div>
                        <div className="xp">{xp} XP</div>
                        <div className="rank">{rank}등</div>
                    </div>
                </div>
                <div className="btnSection">
                    <button className="startBtn" onClick={() => navigate("/game/ready")}></button>
                </div>
            </div>
        </> 
    )
}

export default RankingGameMain;