import React, { useEffect, useState } from "react";
import api from "../../api/api";
import UserRanking from "./UserRanking";
import "./MyRanking.scss";

function MyRanking() {
    const [myInfo, setMyInfo] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMyRanking = async () => {
            try {
                const response = await api.get("/user/my-ranking"); // /api 자동 붙음
                setMyInfo(response.data);
                setError(null);
            } catch (error) {
                console.error("내 랭킹 정보를 불러오는 데 실패했습니다:", error);
                setError("내 랭킹 정보를 불러올 수 없습니다.");
            }
        };

        fetchMyRanking();
    }, []);

    const handleScrollToMyRank = () => {
        if (myInfo && myInfo.rank) {
            const target = document.getElementById(`user-rank-${myInfo.rank}`);
            if (target) {
                target.scrollIntoView({ behavior: "smooth", block: "center" });

                // 깜빡임 애니메이션 효과
                target.classList.add("flash");
                setTimeout(() => target.classList.remove("flash"), 1500);
            }
        }
    };

    // 접근성 위해 div 대신 button 사용하고 키보드 이벤트 추가
    return (
        <div className="MyRank">
            <button
                type="button"
                className="MyRanking"
                onClick={handleScrollToMyRank}
                onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        handleScrollToMyRank();
                    }
                }}
                style={{ cursor: "pointer" }}
                aria-label="내 랭킹으로 스크롤"
            >
                <div className="Ranking">👑 My Ranking 👑</div>

                {myInfo ? (
                    <div className="Rank my-highlight">
                        <div className="Placing">
                            <span className="rank-icon" aria-hidden="true">⭐</span>
                            <b className="MyPlacing">{myInfo.rank}</b> 등
                        </div>
                        <div className="Ranker">{myInfo.nickname}</div>
                        <div className="Percent">
                            XP: <b className="r">{myInfo.xp}</b> XP
                        </div>
                    </div>
                ) : error ? (
                    <div className="Rank error-message" role="alert">
                        {error}
                    </div>
                ) : (
                    <div className="Rank loading">내 랭킹 정보를 불러오는 중...</div>
                )}
            </button>

            <div className="User_Ranking">
                {myInfo && <UserRanking currentUsername={myInfo.nickname} />}
            </div>
        </div>
    );
}

export default MyRanking;
