import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Router from "./Router";
import "./App.scss";
import api from "./api";

function App() {
    const [isCheckingAuth, setIsCheckingAuth] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const checkAuth = async () => {
            const token = localStorage.getItem("token");
            console.log("토큰 있음: ", token);
            
            if (!token) {
                setIsCheckingAuth(false);
                return;
            }

            try {
                const res = await api.get("/user/me");
                console.log("로그인 유저 정보: ", res.data);
            } catch (err) {
                console.error("토큰 만료 또는 유효하지 않음", err);
                localStorage.removeItem("token");
                navigate('/auth/login');
            } finally {
                setIsCheckingAuth(false);
            }
        };

        checkAuth();
    }, [navigate]);

    if (isCheckingAuth) {
        return <div>로딩 중...</div>
    }

    return <Router />;
}

export default App;



