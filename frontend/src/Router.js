import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "./pages/Main/Main";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import GameUser from "./pages/Game/GameUser";
import GameGuest from "./pages/Game/GameGuest";
import MyPage from "./pages/Game/MyPage/MyPage";
import ReadyPage from "./pages/Game/Game_page/ReadyPage";
import QuestionPage from "./pages/Game/Game_page/QuestionPage";
import RightAnswerPage from "./pages/Game/Game_page/RightAnswerPage";
import WrongAnswerPage from "./pages/Game/Game_page/WrongAnswerPage";
import ResultPage from "./pages/Game/Game_page/ResultPage";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/auth/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/game/guest" element={<GameGuest />} />
        <Route path="/game/user" element={<GameUser />} />
        <Route path="/user/mypage" element={<MyPage />} />
        <Route path="/game/ready" element={<ReadyPage />} />
        <Route path="/game/question" element={<QuestionPage />} />
        <Route path="/game/answer/right" element={<RightAnswerPage />} />
        <Route path="/game/answer/wrong" element={<WrongAnswerPage />} />
        <Route path="/game/result" element={<ResultPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
