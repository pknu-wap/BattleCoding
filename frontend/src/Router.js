import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Main from "./pages/Main/Main";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import PracticeGameMain from "./pages/Game/Game_main/PracticeGame_main";
import RankingGameMain from "./pages/Game/Game_main/RankingGame_main";
import MyPage from "./pages/Game/MyPage/MyPage";
import ReadyPage from "./pages/Game/Game_page/ReadyPage";
import QuestionPage from "./pages/Game/Game_page/QuestionPage";
import RightAnswerPage from "./pages/Game/Game_page/RightAnswerPage";
import WrongAnswerPage from "./pages/Game/Game_page/WrongAnswerPage";
import ResultPage from "./pages/Game/Game_page/ResultPage";
import MyRanking from "./pages/ranking/MyRanking";
import EditProfile from "./pages/Game/MyPage/MyAccount/EditProfile/EditProfile";
import ModeSelect from "./pages/Game/ModeSelect/ModeSelect";

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

      <Route path="/game/practice" element={<ProtectedRoute element={<PracticeGameMain />} />} />
      <Route path="/game/ranking" element={<ProtectedRoute element={<RankingGameMain />} />} />
      <Route path="/mypage" element={<ProtectedRoute element={<MyPage />} />} />
      <Route path="/mypage/edit" element={<ProtectedRoute element={<EditProfile />} />} />
      <Route path="game/mode" element={<ProtectedRoute element={<ModeSelect />} />} />
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
