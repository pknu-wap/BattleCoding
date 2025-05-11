import React, { useEffect, useState } from "react";
import "./MyRank.scss";
import UserRank from "./UserRank";
// import axios from "axios"; // 일단 비활성화

function MyRank() {
    const [myInfo, setMyInfo] = useState(null);

    useEffect(() => {
        // ⚠ 백엔드 API 없을 경우 임시 데이터로 대체
        const dummyData = {
            rank: 5,
            username: "임시사용자",
            percent: 87.65
        };

        // API가 준비되면 아래 코드로 교체
        // axios.get("/api/user/myrank")
        //     .then((res) => setMyInfo(res.data))
        //     .catch((err) => console.error("내 랭킹 불러오기 실패:", err));

        setTimeout(() => {
            setMyInfo(dummyData);
        }, 500); // 약간의 로딩 시간 흉내
    }, []);

    return (
        <div className="MyRank">
            <div className="MyRanking">
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
                {myInfo && <UserRank currentUsername={myInfo.username} />}
            </div>
        </div>
    );
}

export default MyRank;
