import React from "react";
import "./MyHome.scss";
import MyAccount from "../MyAccount/MyAccount";
import MyQuiz from "../MyQuiz/MyQuiz";
import MyRank from "../MyRank/MyRank";

function My_Home() {
  return (
    <div className="MyBackground">
      <div className="MyLayout">
        <div className="MyContent">
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
