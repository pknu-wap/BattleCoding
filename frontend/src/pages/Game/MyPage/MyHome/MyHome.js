import React from "react";
import "./MyHome.css";
import MyAccount from "../MyAccount/MyAccount";
import MyQuiz from "../MyQuiz/MyQuiz";
import MyRank from "../MyRank/MyRank";

function My_Home() {
  return (
    <div className="MyBackground">
      <div className="MyLayout">
        <div className="Mycontent">
          <div className="MyProfile">
            <MyAccount />
            <MyQuiz />
            <MyRank />
          </div>
        </div>
      </div>
    </div>
  );
}

export default My_Home;
