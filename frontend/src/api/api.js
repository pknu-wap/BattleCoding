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
        try {
            const originalRequest = error.config || {};
            const status = error.response?.status;


            if (status === 401 && !originalRequest._retry) {
                console.log("🚀 401 감지됨 → refresh 시도");

                originalRequest._retry = true;

                const refreshRes = await axios.post(
                    process.env.REACT_APP_API_URL + "/api/auth/refresh",
                    null,
                    { withCredentials: true }
                );

                const newAccessToken = refreshRes.data.token;
                localStorage.setItem("token", newAccessToken);

                originalRequest.headers = originalRequest.headers || {};
                originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

                return api(originalRequest);
            }

            return Promise.reject(error);
        } catch (interceptorError) {
            console.error("❌ 인터셉터 자체 에러 발생", interceptorError);
            localStorage.removeItem("token");
            window.location.href = "/auth/login";
            return Promise.reject(interceptorError);
        }
    }
);

export default api;
