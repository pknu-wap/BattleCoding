import React, { useEffect, useState } from "react";
import axios from "axios";
import "./UserRanking.scss";

function UserRanking({ currentUsername }) {
    const [userData, setUserData] = useState([]);

    useEffect(() => {
        const fetchRankingData = async () => {
            try {
                const response = await axios.get("http://your-backend.com/api/ranking");
                setUserData(response.data);
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
                <span className="percent">정확도(%)</span>
            </div>
            <div className="userList">
                {userData.slice(0, 10).map((user, index) => {
                    let rankClass = "";
                    if (index === 0) rankClass = "first";
                    else if (index === 1) rankClass = "second";
                    else if (index === 2) rankClass = "third";

                    return (
                        <div
                            className={`userRow ${rankClass} ${user.username === currentUsername ? "currentUser" : ""}`}
                            key={user.username}
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
                            <span className="username">{user.username}</span>
                            <span className="scoreline">
                                <b className="aNumber">{user.attempts}</b>/
                                <b className="rNumber">{user.right}</b>/
                                <b className="wNumber">{user.wrong}</b>
                            </span>
                            <span className="percent">
                                <b className="r">{user.percent.toFixed(2)}</b> %
                            </span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default UserRanking;
