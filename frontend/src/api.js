import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

console.log("✅ axios interceptor 등록됨");

api.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("token");
      console.log("인터셉터에서 보내는 토큰:", token);
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );
  
  export default api;