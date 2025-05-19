import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
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
import ModeSelect from "./pages/Game/Mode_Select/Mode_Select";

const isAuthenticated = () => {
  return !!localStorage.getItem("token");
};

const ProtectedRoute = ({ element }) => {
  return isAuthenticated() ? element : <Navigate to="/auth/login" replace />;
}

const Router = () => {

  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/auth/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/game" element={<GameMain />}/>

      <Route path="/game" element={<ProtectedRoute element={<GameMain />} />} />
      <Route path="/mypage" element={<ProtectedRoute element={<MyPage />} />} />
      <Route path="/mypage/edit" element={<ProtectedRoute element={<EditProfile />} />} />
      <Route path="/game/ready" element={<ProtectedRoute element={<ReadyPage />} />} />
      <Route path="/game/question" element={<ProtectedRoute element={<QuestionPage />} />} />
      <Route path="/game/answer/right" element={<ProtectedRoute element={<RightAnswerPage />} />} />
      <Route path="/game/answer/wrong" element={<ProtectedRoute element={<WrongAnswerPage />} />} />
      <Route path="/game/result" element={<ProtectedRoute element={<ResultPage />} />} />
      <Route path="/ranking" element={<ProtectedRoute element={<MyRanking />} />} />
      <Route path="/game/mode" element={<ProtectedRoute element={<ModeSelect />} />} />    </Routes>
  );
};

export default Router;
