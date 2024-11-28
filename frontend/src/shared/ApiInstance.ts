// src/api/axiosInstance.ts
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

// Axios 인스턴스를 생성하고 기본 설정을 적용
const axiosInstance = axios.create({
  baseURL: API_URL, // 기본 API URL
  timeout: 10000, // 요청 제한 시간
  headers: {
    "Content-Type": "application/json",
  },
});

// 응답 인터셉터 추가
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API 요청 오류:", error.message);
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.request.use((config) => {
  return config;
});

export default axiosInstance;
