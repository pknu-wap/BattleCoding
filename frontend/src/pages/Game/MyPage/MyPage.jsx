import React from "react";
import "./MyPage.css";
import Navbar from "../../Navbar/Navbar";
import Home from "./MyHome/MyHome";

function MyPage() {
  return (
    <div className="My_Page">
      <Navbar type="user" />
      <Home />
    </div>
  );
}

export default MyPage;
