import React from "react";
import "./UserRank.css";

function User_Rank() {
  return (
    <div className="UserRanking">
      <div className="Readerboard">🎖️READERBOARD🎖️</div>
      <div className="UserRank">
        <div className="User_1st">
          <div className="Placing">
            <span className="r1st">
              🥇 <b>1</b>등
            </span>
          </div>
          <span className="Rank1st">1st User</span>
          <span className="Scoreline">
            <b className="aNumber">???</b>/<b className="rNumber">???</b>/
            <b className="wNumber">???</b>
          </span>
          <span className="Percent">
            <b className="r">XX.xx</b> %
          </span>
        </div>
        <div className="User_2nd">
          <div className="Placing">
            <span className="r2nd">
              🥈 <b>2</b>등
            </span>
          </div>
          <span className="Rank2nd">2nd User</span>
          <span className="Scoreline">
            <b className="aNumber">???</b>/<b className="rNumber">???</b>/
            <b className="wNumber">???</b>
          </span>
          <span className="Percent">
            <b className="r">XX.xx</b> %
          </span>
        </div>
        <div className="User_3rd">
          <div className="Placing">
            <span className="r3rd">
              🥉 <b>3</b>등
            </span>
          </div>
          <span className="Rank3rd">3rd User</span>
          <span className="Scoreline">
            <b className="aNumber">???</b>/<b className="rNumber">???</b>/
            <b className="wNumber">???</b>
          </span>
          <span className="Percent">
            <b className="r">XX.xx</b> %
          </span>
        </div>
      </div>
    </div>
  );
}

export default User_Rank;
