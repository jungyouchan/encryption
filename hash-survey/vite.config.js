// vite.config.js
import { defineConfig } from 'vite';

export default defineConfig({
  root: '.',        // index.html이 있는 폴더
  base: '/', // 배포/개발 시 경로 앞에 붙음
  publicDir: 'public', // WASM 파일 등 static 파일 위치
  build: {
    outDir: 'dist',    // 빌드 결과물 폴더
  },
  server: {
    port: 5173,     // 개발 서버 포트
  }
});
