import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL + "/api",  // 모든 API 요청은 /api 하위로
});


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
  
  export default api;