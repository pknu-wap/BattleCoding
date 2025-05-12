import React from "react";
import "./MyRank.scss";

function My_Rank() {
  return (
    <div className="My_Rank">
      <div className="MyRanking">
        <div className="Ranking">나의 랭킹</div>
        <div className="Rank">
          <div className="MyPlacing"><b>?</b>등</div>
          <div className="Ranker">NICKNAME</div>
          <div className="myXp">XX.xx</div>
        </div>
      </div>
    </div>
  );
}

export default My_Rank;
