import React from 'react';
import './Main.css';
import logo2 from './logo/logo2.png';

const MainPage = () => {
  return (
    <div className="container">
      <div className="logo-container">
        <img src={logo2} className="logo-image" />
      </div>
      <div className="button-container">
        <button className="button">게스트로 참여하기</button>
        <button className="button">로그인 하러가기</button>
      </div>
    </div>
  );
};

export default Main;