import React from "react";
import "./MyPage.css";
import MyHeader from "./MyHeader/MyHeader";
import Home from "./MyHome/MyHome";

function MyPage() {
  return (
    <div className="My_Page">
      <MyHeader />
      <Home />
    </div>
  );
}

export default MyPage;
