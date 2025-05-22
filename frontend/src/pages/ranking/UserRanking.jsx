import React, { useEffect, useState } from "react";
import api from "../../api/api";
import "./UserRanking.scss";

function UserRanking({ currentUsername, page, setPage }) {
    const [userData, setUserData] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchRankingData = async () => {
            setLoading(true);
            try {
                const response = await api.get("/user/rankings", { params: { page } });
                const data = response.data;

                if (data && Array.isArray(data.content)) {
                    setUserData(data.content);
                    setTotalPages(data.totalPages);
                } else {
                    console.error("랭킹 데이터 형식 오류:", data);
                    setUserData([]);
                    setTotalPages(0);
                }
            } catch (error) {
                console.error("랭킹 데이터를 불러오는 데 실패했습니다:", error);
                setUserData([]);
                setTotalPages(0);
            } finally {
                setLoading(false);
            }
        };

        fetchRankingData();
    }, [page]);

    const handlePrevPage = () => {
        if (page > 0) setPage(page - 1);
    };

    const handleNextPage = () => {
        if (page < totalPages - 1) setPage(page + 1);
    };

    const handleNumberClick = (pageNumber) => {
        setPage(pageNumber);
    };

    return (
        <div className="UserRanking">
            <div className="Leaderboard">🎖️ LeaderBoard 🎖️</div>
            <div className="userHeader">
                <span className="placing">순위</span>
                <span className="username">사용자명</span>
                <span className="scoreline">문제수 / 정답 / 오답</span>
                <span className="percent">XP</span>
            </div>

            {loading ? (
                <div className="loading">랭킹 데이터를 불러오는 중...</div>
            ) : (
                <div className="userList">
                    {userData.length === 0 ? (
                        <div className="noData">랭킹 데이터가 없습니다.</div>
                    ) : (
                        userData.map((user, index) => {
                            const rank = page * 10 + index + 1;
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
                        })
                    )}
                </div>
            )}

            {/* 페이징 버튼 */}
            <div className="pagination">
                <button onClick={handlePrevPage} disabled={page === 0} className="pageBtn">
                    이전
                </button>

                {[...Array(totalPages).keys()]
                    .slice(Math.max(0, page - 4), page + 5)
                    .map((p) => (
                        <span
                            key={p}
                            className={`page-number ${page === p ? "active" : ""}`}
                            onClick={() => handleNumberClick(p)}
                        >
                            {p + 1}
                        </span>
                    ))}

                <button onClick={handleNextPage} disabled={page === totalPages - 1} className="pageBtn">
                    다음
                </button>
            </div>
        </div>
    );
}

export default UserRanking;
