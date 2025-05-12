import React, { useEffect, useState } from "react";
import axios from "axios";
import "./UserRank.scss";
import api from "../../../api";

function User_Rank({ currentUsername }) {
    const [userData, setUserData] = useState([]);

    useEffect(() => {
        api.get("/api/user/rankings") // 실제 백엔드 랭킹 API 주소
            .then((res) => setUserData(res.data))
            .catch((err) => console.error(err));
    }, []);

    return (
        <div className="UserRanking">
            <div className="Readerboard">🎖️ ReaderBoard 🎖️</div>

            <div className="userList">
                {userData.slice(0, 10).map((user, index) => (
                    <div
                        className={`userRow ${user.username === currentUsername ? "currentUser" : ""}`}
                        key={user.username}
                    >
                        <div className="placing">
              <span className={`rank`}>
                {index === 0 ? "🥇" : index === 1 ? "🥈" : index === 2 ? "🥉" : `${index + 1}등`}
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
                ))}
            </div>
        </div>
    );
}

export default User_Rank;
