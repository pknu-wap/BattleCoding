import React, { useEffect, useState } from "react";
import "./MyRank.scss";
import UserRank from "./UserRank";
import axios from "axios";
import api from "../../../api";

function My_Rank() {
    const [myInfo, setMyInfo] = useState(null);

    useEffect(() => {
        api.get("/user/myrank")
            .then((res) => setMyInfo(res.data))
            .catch((err) => console.error("내 랭킹 불러오기 실패:", err));
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

export default My_Rank;
