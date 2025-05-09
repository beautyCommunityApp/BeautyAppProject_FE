// src/api/instance.js
import axios from "axios";

// const instance = axios.create({
//   baseURL: "http://localhost:8080/app/api", // 기본 주소 세팅
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

const instance = axios.create({
  baseURL: "http://localhost:8080/app/api", // API 공통 prefix
  withCredentials: true, // 로그인 쿠키 포함 등
  headers: {
    "Content-Type": "application/json",
  },
});

// 요청 보낼 때 자동으로 토큰 붙이기
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;
