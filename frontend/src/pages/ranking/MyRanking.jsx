import React, { useEffect, useState } from "react";
import api from "../../api/api";
import UserRanking from "./UserRanking";
import Navbar from "../Navbar/Navbar";

import "./MyRanking.scss";

function MyRanking() {
    const [myInfo, setMyInfo] = useState(null);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(0); // 현재 페이지 상태 추가

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

    // 스크롤 함수 분리
    const scrollToRank = (rank) => {
        const target = document.getElementById(`user-rank-${rank}`);
        if (target) {
            target.scrollIntoView({ behavior: "smooth", block: "center" });

            // 깜빡임 애니메이션 효과
            target.classList.add("flash");
            setTimeout(() => target.classList.remove("flash"), 1500);
        }
    };

    const handleScrollToMyRank = () => {
        if (!myInfo?.rank) return;

        const myPage = Math.floor((myInfo.rank - 1) / 10); // 한 페이지에 10명씩 보여준다고 가정
        if (myPage !== page) {
            setPage(myPage);  // 페이지가 다르면 페이지 이동 요청
        } else {
            // 이미 현재 페이지라면 바로 스크롤
            scrollToRank(myInfo.rank);
        }
    };

    // page 또는 myInfo.rank 변경 시, 내 랭킹이 해당 페이지에 있다면 스크롤 실행
    useEffect(() => {
        if (myInfo?.rank && Math.floor((myInfo.rank - 1) / 10) === page) {
            scrollToRank(myInfo.rank);
        }
    }, [page, myInfo]);

    return (
        <>
            <Navbar type="main" />  {/* 여기서 Navbar 추가 */}

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
                    {myInfo && (
                        <UserRanking
                            currentUsername={myInfo.nickname}
                            page={page}
                            setPage={setPage}
                        />
                    )}
                </div>
            </div>
        </>
    );
}

export default MyRanking;