import React, { useEffect, useState } from "react";
import api from "../../api";  // api.js를 통해 호출
import UserRanking from "./UserRanking"; // UserRanking 컴포넌트 import (경로 맞춰서 수정)

function MyRanking() {
    const [myInfo, setMyInfo] = useState(null);

    useEffect(() => {
        const fetchMyRanking = async () => {
            try {
                const response = await api.get("/user/my-ranking");  // /api 자동 붙음
                setMyInfo(response.data);
            } catch (error) {
                console.error("내 랭킹 정보를 불러오는 데 실패했습니다:", error);
            }
        };

        fetchMyRanking();
    }, []);

    const handleScrollToMyRank = () => {
        if (myInfo && myInfo.rank) {
            const target = document.getElementById(`user-rank-${myInfo.rank}`);
            if (target) {
                target.scrollIntoView({ behavior: "smooth", block: "center" });
            }
        }
    };

    return (
        <div className="MyRank">
            <div
                className="MyRanking"
                onClick={handleScrollToMyRank}
                style={{ cursor: "pointer" }}
            >
                <div className="Ranking">👑 My Ranking 👑</div>

                {myInfo ? (
                    <div className="Rank my-highlight">
                        <div className="Placing">
                            <span className="rank-icon">⭐</span>
                            <b className="MyPlacing">{myInfo.rank}</b> 등
                        </div>
                        <div className="Ranker">{myInfo.nickname}</div>
                        <div className="Percent">
                            XP: <b className="r">{myInfo.xp}</b> XP
                        </div>
                    </div>
                ) : (
                    <div className="Rank loading">내 랭킹 정보를 불러오는 중...</div>
                )}
            </div>

            <div className="User_Ranking">
                {myInfo && <UserRanking currentUsername={myInfo.nickname} />}
            </div>
        </div>
    );
}

export default MyRanking;
