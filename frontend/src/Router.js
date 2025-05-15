import React from "react";
import { Routes, Route } from "react-router-dom";
import Main from "./pages/Main/Main";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import GameMain from "./pages/Game/Game_main/Game_main";
import MyPage from "./pages/Game/MyPage/MyPage";
import ReadyPage from "./pages/Game/Game_page/ReadyPage";
import QuestionPage from "./pages/Game/Game_page/QuestionPage";
import RightAnswerPage from "./pages/Game/Game_page/RightAnswerPage";
import WrongAnswerPage from "./pages/Game/Game_page/WrongAnswerPage";
import ResultPage from "./pages/Game/Game_page/ResultPage";
import MyRanking from "./pages/ranking/MyRanking";
import EditProfile from "./pages/Game/MyPage/MyAccount/EditProfile/EditProfile";

const Router = () => {

  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/auth/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/game" element={<GameMain />}/>

      <Route path="/mypage/edit" element={<EditProfile />} />
      <Route path="/game/ready" element={<ReadyPage />} />
      <Route path="/game/question" element={<QuestionPage />} />
      <Route path="/game/answer/right" element={<RightAnswerPage />} />
      <Route path="/game/answer/wrong" element={<WrongAnswerPage />} />
      <Route path="/game/result" element={<ResultPage />} />
      <Route path="/ranking" element={<MyRanking />} />
    </Routes>
  );
};

export default Router;
