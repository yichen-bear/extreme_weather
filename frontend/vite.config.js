import { fileURLToPath, URL } from 'node:url'
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

export default defineConfig(({ mode }) => {
  // 這裡會自動根據目前的模式（development 或 production）載入環境變數
  const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [
      vue(),
      vueDevTools(),
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      },
    },
    server: {
      // 在本地開發時不需要擋 Host，在線上（Render）則放行
      allowedHosts: mode === 'development' ? true : true, 
      proxy: {
        '/api': {
          // 如果環境變數有設定後端網址就用線上的，沒有就預設用本地的 localhost:3000
          target: 'http://localhost:3000', 
          changeOrigin: true,
          secure: false
        }
      }
    }
  }
})