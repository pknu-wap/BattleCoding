import React, { useEffect, useState } from "react";
import api from "../../../../api";
import "./MyQuiz.scss";

function MyQuiz() {

  const [stats, setStats] = useState({
    totalSubmitted: 0,
    totalCorrect: 0,
    totalWrong: 0
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await api.get("/user/my-ranking");

        console.log("API 응답값 확인:", res.data);
        console.log("wrong 값 확인:", res.data.totalWrong);

        setStats({
          totalSubmitted: res.data.totalSubmitted,
          totalCorrect: res.data.totalCorrect,
          totalWrong: res.data.totalWrong
        });
      } catch (err) {
        console.error("퀴즈 통계 불러오기 실패:", err);
      }
    };

    fetchStats();
  }, []);

  const { totalSubmitted, totalCorrect, totalWrong } = stats;
  const correctRate = totalSubmitted > 0 ? ((totalCorrect / totalSubmitted) * 100).toFixed(1) : 0;


  return (
    <div className="myQuiz">
      <div className="myStats">통계</div>
        <div className="myQuestion">
          <span className="myAll">
            <span>풀이 개수</span>
            <span><b className="Number">{totalSubmitted}</b> 개</span>
          </span>
          <span className="myRight">
            <span>정답 개수</span>
            <span><b className="Number">{totalCorrect}</b> 개</span>
          </span>
          <span className="myWrong">
            <span>오답 개수</span>
            <span><b className="Number">{totalWrong}</b> 개</span>
          </span>
          <span className="myPercent">
            <span>정 답 률</span>
            <span><b className="Number">{correctRate}</b> %</span>
          </span>          
        </div>
    </div>
  );
}

export default MyQuiz;
