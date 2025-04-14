import React from "react";
import "./MyRank.css";
import UserRank from "../MyRank/UserRank";

function My_Rank() {
  return (
    <div className="MyRank">
      <div className="MyRanking">
        <div className="Ranking">👑MY RANKING👑</div>
        <div className="Rank">
          <span className="Placing">
            <b className="MyPlacing">???</b> 등
          </span>
          <span className="Ranker">NICKNAME</span>
          <span className="Scoreline">
            <b className="aNumber">???</b>/<b className="rNumber">???</b>/
            <b className="wNumber">???</b>
          </span>
          <span className="Percent">
            <b className="r">XX.xx</b> %
          </span>
        </div>
      </div>
      <div className="User_Ranking">
        <UserRank />
      </div>
    </div>
  );
}

export default My_Rank;
