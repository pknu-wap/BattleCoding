import React, { useEffect, useState } from "react";
import "./MyRanking.scss";
import UserRanking from "./UserRanking";

function MyRanking() {
    const [myInfo, setMyInfo] = useState(null);

    useEffect(() => {
        const dummyData = {
            rank: 10,
            username: "me",
            percent: 87.65
        };

        setTimeout(() => {
            setMyInfo(dummyData);
        }, 500);
    }, []);

    const handleScrollToMyRank = () => {
        if (myInfo && myInfo.rank) {
            const target = document.getElementById(`user-rank-${myInfo.rank}`);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }
    };

    return (
        <div className="MyRank">
            <div className="MyRanking" onClick={handleScrollToMyRank} style={{ cursor: 'pointer' }}>
                <div className="Ranking">👑 My Ranking 👑</div>

                {myInfo ? (
                    <div className="Rank my-highlight">
                        <div className="Placing">
                            <span className="rank-icon">⭐</span>
                            <b className="MyPlacing">{myInfo.rank}</b> 등
                        </div>
                        <div className="Ranker">{myInfo.username}</div>
                        <div className="Percent">
                            정확도: <b className="r">{myInfo.percent.toFixed(2)}</b>%
                        </div>
                    </div>
                ) : (
                    <div className="Rank loading">내 랭킹 정보를 불러오는 중...</div>
                )}
            </div>

            <div className="User_Ranking">
                {myInfo && <UserRanking currentUsername={myInfo.username} />}
            </div>
        </div>
    );
}

export default MyRanking;
