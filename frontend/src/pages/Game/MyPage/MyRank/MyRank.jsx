import React from "react";
import "./MyRank.scss";

function My_Rank() {
  return (
    <div className="MyRank">
      <div className="MyRanking">
        <div className="Ranking">나의 랭킹</div>
        <div className="Rank">
          <div className="Placing">
            <b className="MyPlacing">?</b> 등
          </div>
          <div className="Ranker">NICKNAME</div>
          <div className="myXp">
            <b className="r">XX.xx</b>
          </div>
        </div>
      </div>
    </div>
  );
}

export default My_Rank;
