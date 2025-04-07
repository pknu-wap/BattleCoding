import React from "react";
import "./MyHome.css";

function My_Home() {
  return (
    <div className="MyBackground">
      <div className="MyLayout">
        <div className="MyContent">
          <div className="MyProfile">
            <div className="MyAccount">
              <span className="MyImage">
                <img
                  className="AccountImage"
                  alt="내 사진"
                  src="https://search.pstatic.net/sunny/?src=https%3A%2F%2Fyt3.googleusercontent.com%2Fytc%2FAIdro_lID9IEcsQjGr44894Ha1y2gjAmMzAl9Cp1mQKNDfbJmg%3Ds900-c-k-c0x00ffffff-no-rj&type=sc960_832"
                />
              </span>
              <span className="MyName">닉네임</span>
              <span className="MyId">ID</span>
            </div>
            <div className="MyPassword">
              <span className="MyPw">비밀번호 설정</span>
              <button className="ChangeButton" type="button">
                비밀번호 변경
              </button>
            </div>
            <div className="MyRank">
              <span className="MyCheck">랭킹 확인</span>
              <button className="RankingButton" type="button">
                랭킹페이지
              </button>
            </div>
            <div className="MyQuiz">
              <span>푼 문제 확인</span>
              <button className="RightButton" type="button">
                맞춘 문제
              </button>
              <button className="WrongButton" type="button">
                틀린 문제
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default My_Home;
