import React, { useEffect, useState } from "react";
import "./MyRank.scss";
import api from "../../../../api/api";

function My_Rank() {
  const [rankInfo, setRankInfo] = useState({
    rank: null,
    nickname: "",
    xp: 0
  });

  useEffect(() => {
    const fetchRanking = async () => {
      try {
        const res = await api.get("/user/my-ranking");
        setRankInfo({
          rank: res.data.rank,
          nickname: res.data.nickname,
          xp: res.data.xp
        });
      } catch (err) {
        console.error("랭킹 정보 불러오기 실패:", err);
      }
    };

    fetchRanking();
  }, []);

  const { rank, nickname, xp } = rankInfo;  

  return (
    <div className="My_Rank">
      <div className="My_Ranking">
        <div className="Ranking1">나의 랭킹</div>
        <div className="Rank">
          <div className="MyPlacing"><b>{rank}</b> 등</div>
          <div className="Ranker">{nickname}</div>
          <div className="myXp"><b>{xp}</b> XP</div>
        </div>
      </div>
    </div>
  );
}

export default My_Rank;
