import React, { useEffect, useState } from "react";
import api from "../../api";  // 수정된 API 경로를 사용

import "./UserRanking.scss";

function UserRanking({ currentUsername }) {
    const [userData, setUserData] = useState([]);

    useEffect(() => {
        const fetchRankingData = async () => {
            try {
                // 실제 배포된 API 서버에서 랭킹 데이터를 가져옵니다.
                const response = await api.get("http://43.200.131.23:8080/");
                setUserData([response.data]); // 단일 유저 정보라 배열로 감쌈
            } catch (error) {
                console.error("랭킹 데이터를 불러오는 데 실패했습니다:", error);
            }
        };

        fetchRankingData();
    }, []);

    return (
        <div className="UserRanking">
            <div className="Leaderboard">🎖️ LeaderBoard 🎖️</div>
            <div className="userHeader">
                <span className="placing">순위</span>
                <span className="username">사용자명</span>
                <span className="scoreline">문제수 / 정답 / 오답</span>
                <span className="percent">XP</span>
            </div>
            <div className="userList">
                {userData.slice(0, 10).map((user, index) => {
                    let rankClass = "";
                    if (index === 0) rankClass = "first";
                    else if (index === 1) rankClass = "second";
                    else if (index === 2) rankClass = "third";

                    return (
                        <div
                            className={`userRow ${rankClass} ${user.nickname === currentUsername ? "currentUser" : ""}`}
                            key={user.nickname}
                            id={`user-rank-${index + 1}`}
                        >
                            <div className="placing">
                                <span className="rank">
                                    {index === 0 && "🥇"}
                                    {index === 1 && "🥈"}
                                    {index === 2 && "🥉"}
                                    {index > 2 && `${index + 1}등`}
                                </span>
                            </div>
                            <span className="username">{user.nickname}</span>
                            <span className="scoreline">
                                <b className="aNumber">{user.totalSubmitted}</b>/
                                <b className="rNumber">{user.totalCorrect}</b>/
                                <b className="wNumber">{user.wrong}</b>
                            </span>
                            <span className="percent">
                                <b className="r">{user.xp}</b> XP
                            </span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default UserRanking;
