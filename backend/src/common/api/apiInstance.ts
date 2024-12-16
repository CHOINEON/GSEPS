import axios from 'axios';

// Python 서버 API 인스턴스 생성
export const pythonServerAPI = axios.create({
  baseURL: process.env.PYTHON_SERVER_URL || 'http://localhost:8000',
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 요청 인터셉터 추가
pythonServerAPI.interceptors.request.use(
  (config) => {
    // 요청 전 처리
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// 응답 인터셉터 추가
pythonServerAPI.interceptors.response.use(
  (response) => {
    // 응답 데이터 처리
    return response;
  },
  (error) => {
    return Promise.reject(error);
  },
);
