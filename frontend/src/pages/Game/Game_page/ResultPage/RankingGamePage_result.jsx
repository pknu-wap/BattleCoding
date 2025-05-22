import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import api from "../../../../api/api";
import "./RankingGamePage_result.scss";

function RankingResult() {
    const navigate = useNavigate();
    const location = useLocation();
    const { score = 0, submissionResults = [] } = location.state || {};

    const [updatedXp, setUpdatedXp] = useState(0);
    const [rank, setRank] = useState(0);
    
    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const userRes = await api.get("/user/me");
                setUpdatedXp(userRes.data.xp);
                
                const rankRes = await api.get("/user/my-ranking");
                setRank(rankRes.data.rank);
            } catch (err) {
                console.error("유저 정보 가져오기 실패", err);
            }
        };
        fetchUserInfo();
    }, []);

    const correctCount = submissionResults.filter(r => r.isCorrect).length;
    const totalXp = submissionResults.reduce((sum, r) => sum + r.xpEarned, 0);

    const getDifficultyLabel = (level) => {
        return level === "EASY" ? "하"
            : level === "MEDIUM" ? "중"
            : level === "HARD" ? "상"
            : "-";
    };

    const getTypeLabel = (type) => {
        return type === "FILL_IN_BLANK" ? "빈칸 삽입"
            : type === "PREDICT_OUTPUT" ? "결과 예측"
            : type === "CS_KNOWLEDGE" ? "CS 지식"
            : "-";
    };

    return (
        <div className="rankingResultWrapper">
            <div className="rankingResultSection">
                <h1>랭킹 모드 결과</h1>
                <div className="resultSumarry">
                    <div className="summaryInfo">총 정답<span>{correctCount} / 10</span></div>
                    <div className="summaryInfo">획득 XP <span>{totalXp > 0 ? `+${totalXp}` : totalXp < 0 ? totalXp : "0"}</span></div>
                    <div className="summaryInfo">순위 <span>{rank}등</span></div>
                </div>

                <div className="resultTableWrapper">
                    <table className="resultTable">
                        <thead>
                            <tr>
                                <th>번호</th>
                                <th>난이도</th>
                                <th>유형</th>
                                <th>정답 여부</th>
                                <th>제출한 답안</th>
                                <th>획득 XP</th>   
                            </tr>
                        </thead>
                        <tbody>
                            {submissionResults.map((item, idx) => (
                                <tr key={idx}>
                                    <td>{idx + 1}</td>
                                    <td>{getDifficultyLabel(item.difficulty)}</td>
                                    <td>{getTypeLabel(item.type)}</td>
                                    <td>{item.isCorrect ? "✅" : "❌"}</td>
                                    <td>{item.userAnswer}</td>
                                    <td style={{ color: item.xpEarned >= 0 ? "#00f0ff" : "#ff4d4f" }}>
                                        {item.xpEarned > 0 ? `+${item.xpEarned}` : item.xpEarned}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="buttonSection">
                <button onClick={() => navigate("/mypage")}>마이페이지</button>
                <button onClick={() => navigate("/game/question", { state: { isRanking: true } })}>다시</button>
                <button onClick={() => navigate("/")}>메인</button>
            </div>
        </div>
    )
}

export default RankingResult;