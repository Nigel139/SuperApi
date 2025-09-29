// https://nuxt.com/docs/api/configuration/nuxt-config
import path from 'path';
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';

export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },
  modules: [
    '@element-plus/nuxt',
    '@pinia/nuxt',
  ],
  css: [
    'element-plus/dist/index.css',
    'element-plus/theme-chalk/display.css',
    '@@/assets/styles/index.less'
  ],
  vite: {
    plugins: [
      createSvgIconsPlugin({
        iconDirs: [path.resolve(process.cwd(), 'assets/icons/svg')],
      })
    ]
  }
})
