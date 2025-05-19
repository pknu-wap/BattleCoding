import React, { useEffect, useState } from "react";
import api from "../../api/api";
import "./UserRanking.scss";

function UserRanking({ currentUsername }) {
    const [userData, setUserData] = useState([]);

    useEffect(() => {
        const fetchRankingData = async () => {
            try {
                const response = await api.get("/rankings");
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
                <span className="percent">XP</span>
            </div>
            <div className="userList">
                {userData.slice(0, 10).map((user, index) => {
                    const rank = user.rank ?? index + 1;

                    let rankClass = "";
                    if (rank === 1) rankClass = "first";
                    else if (rank === 2) rankClass = "second";
                    else if (rank === 3) rankClass = "third";

                    return (
                        <div
                            className={`userRow ${rankClass} ${user.nickname === currentUsername ? "currentUser" : ""}`}
                            key={user.nickname}
                            id={`user-rank-${rank}`}
                        >
                            <div className="placing">
                                <span className="rank">
                                    {rank === 1 && "🥇"}
                                    {rank === 2 && "🥈"}
                                    {rank === 3 && "🥉"}
                                    {rank > 3 && `${rank}등`}
                                </span>
                            </div>
                            <span className="username">{user.nickname}</span>
                            <span className="scoreline">
                                <b className="aNumber">{user.totalSubmitted}</b>/
                                <b className="rNumber">{user.totalCorrect}</b>/
                                <b className="wNumber">{user.totalWrong}</b>
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
