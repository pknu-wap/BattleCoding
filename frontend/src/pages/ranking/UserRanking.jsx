import React, { useEffect, useState } from "react";
// import axios from "axios"; // 아직 API 없으므로 주석 처리
import "./UserRanking.scss";

function UserRanking({ currentUsername }) {
    const [userData, setUserData] = useState([]);

    useEffect(() => {
        // ⚠️ 백엔드 API 대신 더미 데이터 사용
        const dummyUsers = [
            { username: "alice", attempts: 20, right: 18, wrong: 2, percent: 90 },
            { username: "bob", attempts: 30, right: 27, wrong: 3, percent: 90 },
            { username: "charlie", attempts: 25, right: 22, wrong: 3, percent: 88 },
            { username: "david", attempts: 40, right: 35, wrong: 5, percent: 87.5 },
            { username: "erin", attempts: 50, right: 43, wrong: 7, percent: 86 },
            { username: "frank", attempts: 33, right: 28, wrong: 5, percent: 84.85 },
            { username: "grace", attempts: 29, right: 24, wrong: 5, percent: 82.76 },
            { username: "hank", attempts: 22, right: 18, wrong: 4, percent: 81.82 },
            { username: "irene", attempts: 18, right: 14, wrong: 4, percent: 77.78 },
            { username: "임시사용자", attempts: 31, right: 24, wrong: 7, percent: 77.42 }, // currentUser 포함
        ];

        // axios.get("/api/user/rankings")
        //     .then((res) => setUserData(res.data))
        //     .catch((err) => console.error(err));

        setTimeout(() => {
            setUserData(dummyUsers);
        }, 500); // 로딩 효과

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
                            <span className="rank">
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

export default UserRanking;
