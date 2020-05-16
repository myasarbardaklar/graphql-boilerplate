<template lang="pug">
  .container.mx-auto.my-5
    div
      Logo
      h1.title client
      h2.subtitle My groundbreaking Nuxt.js project
      .links
        a.button--green(href='https://nuxtjs.org/', target='_blank') Documentation
        a.button--grey(href='https://github.com/nuxt/nuxt.js', target='_blank') GitHub
</template>

<script>
import Logo from '~/components/Logo.vue'

export default {
  components: {
    Logo
  }
}
</script>
