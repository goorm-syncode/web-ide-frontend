import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath, URL } from 'node:url'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        main: fileURLToPath(new URL('./index.html', import.meta.url)),
      },
      output: {
        manualChunks: (id) => {
          // React & Router 관련 라이브러리 분리
          if (id.includes('node_modules/react') || id.includes('node_modules/react-dom') || id.includes('node_modules/react-router')) {
            return 'vendor-react';
          }
          // Redux 관련 라이브러리 분리
          if (id.includes('node_modules/@reduxjs') || id.includes('node_modules/react-redux')) {
            return 'vendor-redux';
          }
          
          // 모나코 에디터 청크 세분화 (4.14MB -> 소분할)
          if (id.includes('node_modules/monaco-editor')) {
            if (id.includes('esm/vs/language')) return 'monaco-languages';
            if (id.includes('esm/vs/basic-languages')) return 'monaco-basic-langs';
            if (id.includes('esm/vs/editor')) return 'monaco-editor-core';
            if (id.includes('esm/vs/base')) return 'monaco-base';
            return 'monaco-others';
          }

          // 기타 유틸리티 라이브러리 분리
          if (id.includes('node_modules/axios') || id.includes('node_modules/prop-types')) {
            return 'vendor-utils';
          }
        }
      }
    },
    // 일반적인 상황에서의 청크 크기 경고 리밋 (800kB)
    chunkSizeWarningLimit: 800,
  },
})
