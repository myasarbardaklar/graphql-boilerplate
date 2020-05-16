import path from 'path'
import dotenv from 'dotenv'
import dotenvExpand from 'dotenv-expand'

dotenvExpand(dotenv.config())

export default {
  mode: 'universal',
  server: {
    host: process.env.CLIENT_HOST || 'localhost',
    port: process.env.CLIENT_PORT || 4949
  },
  /*
   ** Headers of the page
   */
  head: {
    title: process.env.npm_package_name || '',
    titleTemplate: '%s - AmazonAlpha.js',
    meta: [
      { charset: 'utf-8' },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1'
      },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || ''
      }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: '@components/GlobalSpinner.vue',
  /*
   ** Global CSS
   */
  css: ['@/assets/sass/app.sass'],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    '@/plugins/vee-validate',
    { src: '@/plugins/vue-notification-client', mode: 'client' },
    { src: '@/plugins/vue-notification-server', mode: 'server' }
  ],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/nuxt-tailwindcss
    /* '@nuxtjs/tailwindcss', */
    '@nuxtjs/apollo'
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    '@nuxtjs/pwa',
    // Doc: https://github.com/nuxt-community/dotenv-module
    '@nuxtjs/dotenv',
    'cookie-universal-nuxt'
  ],
  apollo: {
    clientConfigs: {
      default: {
        httpEndpoint: process.env.SERVER_URL
      }
    }
  },
  /*
   ** Build configuration
   */
  build: {
    transpile: ['vee-validate/dist/rules'],
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {
      config.resolve.alias['@components'] = path.join(__dirname, 'components')
      config.resolve.alias['@partials'] = path.join(__dirname, 'partials')
      config.resolve.alias['@icons'] = path.join(__dirname, 'components/icons')
      config.resolve.alias['@sass'] = path.join(__dirname, 'assets/sass')
    }
  }
}
