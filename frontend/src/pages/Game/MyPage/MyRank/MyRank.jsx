import React from "react";
import "./MyRank.scss";
import UserRank from "./UserRank";

function My_Rank() {
  return (
    <div className="MyRank">
      <div className="MyRanking">
        <div className="Ranking">👑 My Ranking 👑</div>
        <div className="Rank">
          <div className="Placing">
            <b className="MyPlacing">?</b> 등
          </div>
          <div className="Ranker">NICKNAME</div>
          <div className="Percent">
            <b className="r">XX.xx</b> %
          </div>
        </div>
      </div>
      <div className="User_Ranking">
        <UserRank />
      </div>
    </div>
  );
}

export default My_Rank;
