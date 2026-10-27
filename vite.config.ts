import { defineConfig } from 'vite';

// 상대 경로(base './')로 빌드해서 GitHub Pages의 /bible-road/ 아래에서도 그대로 동작하게 한다.
export default defineConfig({
  base: './',
  build: { target: 'es2022', chunkSizeWarningLimit: 600 },
});
