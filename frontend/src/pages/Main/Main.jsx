import React from 'react';
import './Main.css';
import logo2 from './logo/logo2.png';

function Main() {
  return (
    <div id="logo-container">
      <img id="logo-image" src={logo2} alt="logo2" />
      <div id="button-container">
        <button>게스트로 참여하기</button>
        <button>로그인 하러가기</button>
      </div>
    </div>
  );
}

export default Main;