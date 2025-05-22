import axios from 'axios';

const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL + "/api",
    withCredentials: true  // 쿠키 자동 전송을 위해 추가
});


// 요청 인터셉터 (Access Token 붙이기)
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// 응답 인터셉터 (401일 때 refresh 시도)
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (
            error.response?.status === 401 &&
            !originalRequest._retry
        ) {
            originalRequest._retry = true;

            try {
                const refreshRes = await axios.post(
                    process.env.REACT_APP_API_URL + "/api/auth/refresh",
                    null,
                    { withCredentials: true }
                );

                const newAccessToken = refreshRes.data.accessToken;
                localStorage.setItem("token", newAccessToken);

                originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                return axios(originalRequest);  // 원래 요청 재시도
            } catch (refreshError) {
                console.error("토큰 재발급 실패", refreshError);
                localStorage.removeItem("token");
                window.location.href = "/login";
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);

export default api;
