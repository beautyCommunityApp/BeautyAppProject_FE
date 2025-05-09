// src/api/axiosInstance.js
import axios from "axios";

// 공통 axios 인스턴스 생성
const api = axios.create({
  //   baseURL: "/", // 백엔드 API 루트. 필요시 수정
  baseURL: "http://localhost:8080", // ✅ 백엔드 API 주소 명시
  withCredentials: true, // 세션/쿠키 사용하는 백엔드라면 필요
});

// 요청마다 accessToken 자동으로 붙이기
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
