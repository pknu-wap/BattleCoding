import React from "react";
import "./UserRank.scss";

function User_Rank() {
  return (
    <div className="UserRanking">
      <div className="Readerboard">🎖️ READERBOARD 🎖️</div>
      
      <div className="userList">
        {["1st", "2nd", "3rd"].map((place, index) => (
          <div className="userRow" key={index}>
            <div className="placing">
              <span className={`rank ${place}`}>
                {index === 0 ? "🥇" : index === 1 ? "🥈" : "🥉"} <b>{index + 1}</b>등
              </span>
            </div>
            <span className="username">{place} User</span>
            <span className="scoreline">
              <b className="aNumber">???</b>/<b className="rNumber">???</b>/<b className="wNumber">???</b>
            </span>
            <span className="percent">
              <b className="r">XX.xx</b> %
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default User_Rank;
