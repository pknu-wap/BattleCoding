import api from "../api";

export const getRandomQuestionByType = async ({ type, count = 10 }) => {
    const token = localStorage.getItem("token");
    console.log("getRandomQuestionByType 함수 진입");
    if (!type || !token) {
        throw new Error('문제 type 또는 JWT 토큰이 누락되었습니다.');
    }

    try {
        const response = await api.get(
            "questions/random/by-type",
            {
                params: { type, count },
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        console.log("API 응답:", response);
        return response.data;
    }
    catch (error) {
        console.error("문제 가져오기 오류: ", error);
        throw new Error('문제를 불러오는 중 오류가 발생하였습니다.');
    }
}

export const getRandomQuestionByTypeAndDifficulty = async ({ type, difficulty, count = 10 }) => {
    console.log("getRandomQuestionByTypeAndDifficulty 함수 진입");
    if (!type || !difficulty) {
        throw new Error('문제 type, difficulty가 누락되었습니다.');
    }

    try {
        const response = await api.get(
            "/questions/random/by-type-and-difficulty",
            {
                params: { type, difficulty, count }
            }
        );
        console.log("API 응답:", response);
        return response.data;
    }
    catch (error) {
        console.error("문제 가져오기 오류: ", error);
        throw new Error('문제를 불러오는 중 오류가 발생하였습니다.')
    }
}