import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // 모든 네트워크 인터페이스에서 접근 허용
    port: 5173, // 포트 지정
    watch: {
      usePolling: true, // Docker 환경에서 HMR을 위한 설정
    },
  },
});
