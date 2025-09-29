export default defineNuxtConfig({
  target: 'static', // 静态化构建
  ssr: true,        // 启用 SSR（默认）
  modules: ['@nuxt/image', 'nuxt-swiper', '@nuxtjs/device'],
  build: {
    transpile: ['vue3-count-to'], // 强制转译这个包
    extend(config: any, ctx: any) {
      if (ctx.isClient) {
        config.resolve.alias['video.js'] = 'video.js/core'
      }
    }
  },
  plugins:[
    '~/plugins/vue-easy-lightbox.client.js',
  ],
  app: {
    head: {
      viewport: 'width=device-width, initial-scale=1',
      title: '我的官网',
      meta: [
        { name: 'description', content: '这是我的企业官网' }
      ],
      script: [
        // { src: '/lib/jquery/jquery.min.js' },
      ],
      link: [
        { rel: 'stylesheet', href: '/lib/bootstrap/bootstrap.min.css' },
        { rel: 'stylesheet', href: '/css/style.css' },
        // { rel: 'stylesheet', href: '/css/responsive.css' },
        { rel: 'stylesheet', href: '/css/font-icons.css' },
        { rel: 'stylesheet', href: '/css/animate.css' },
        // { rel: 'stylesheet', href: '/css/radio-checkbox.css' },
      ]
    }
  }
})