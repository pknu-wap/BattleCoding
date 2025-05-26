import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from '../../../../api/api';
import Navbar from "../../../Navbar/Navbar";
import "./MiniGame_Person_ready.scss";

function MiniGamePersonReady() {
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            alert("로그인이 필요합니다.");
            navigate("/auth/login");
        }
    }, [navigate]);

    const image = "https://res.cloudinary.com/dcvhzjuzc/image/upload/v1747965338/image2_pduqs3.png";

    const handleStart = () => {
        navigate("/game/question", {
            state: {
                mode: "mini",
                type: "GUESS_WHO",
                isRanking: false,
                title: "인물 퀴즈",
                description: `사진을 보고 인물의 이름을 맞혀보는 게임입니다`,
                image,
            },
        });
    };

    return (
        <>
            <Navbar type="user" />
            <div className="miniMain">
                <div className="floatingWords">
                    <span className="word word1">누구</span>
                    <span className="word word2">정답</span>
                    <span className="word word3">인물</span>
                    <span className="word word4">이름</span>
                </div>

                <div className="miniContent">
                    <div className="miniIntro">
                        <p className="miniHeading">
                            <span className="highlight">인물 퀴즈</span>를 시작해 볼까요?
                        </p>
                        <p className="miniSubtext">사진 속 인물을 보고 이름을 맞혀보세요!</p>
                    </div>

                    <div className="ruleSection">
                        <h3>게임 규칙</h3>
                        <p>인물의 <strong>사진</strong>이 제시되면 <strong>정확한 이름</strong>을 입력해 주세요.</p>
                        <p>철자나 띄어쓰기가 다르면 오답 처리될 수 있으니 주의하세요!</p>                    
                    </div>

                    <div className="btnSection">
                        <button className="startBtn" onClick={handleStart}>시작하기</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default MiniGamePersonReady;