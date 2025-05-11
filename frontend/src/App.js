import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Main from "./pages/Main/Main";
import Login from "./pages/Login/Login";
import GameHeaderGuest from "./pages/Game/GameHeader/GameHeader_Guest";
import GameHeaderUser from "./pages/Game/GameHeader/GameHeader_User";
import Game from "./pages/Game/Game";
import ReadyPage from "./pages/Page/ReadyPage";
import ResultPage from "./pages/Page/ResultPage";
import MyRanking from "./pages/ranking/MyRanking";
import "./App.scss";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Main />} />
                <Route path="/login" element={<Login />} />
                <Route path="/game-header-guest" element={<GameHeaderGuest />} />
                <Route path="/game-header-user" element={<GameHeaderUser />} />
                <Route path="/game" element={<Game />} />
                <Route path="/ready" element={<ReadyPage />} />
                <Route path="/result" element={<ResultPage />} />
                <Route path="/ranking" element={<MyRanking />} />
            </Routes>
        </Router>
    );
}

export default App;
