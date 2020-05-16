<template lang="pug">
  nav.bg-purple-900.py-4
    .container.mx-auto.flex.items-center.justify-between
      .flex.items-center
        nuxt-link.inline-flex.items-center(to='/')
          img(src='https://getbootstrap.com/docs/4.4/assets/brand/bootstrap-solid.svg', alt='', width='30', height='30')
          span.text-lg.ml-2.text-white.font-medium Bootstrap
        .flex.items-center.ml-5
          nuxt-link.text-purple-300.font-medium(class='hover:text-purple-100', to='/') Home
          nuxt-link.text-purple-300.font-medium.ml-5(class='hover:text-purple-100', to='/about') About
      .flex.items-center(v-if="isAuth")
        nuxt-link.flex.items-center(to="/")
          img.rounded-full.mr-3(
            :src="`http://localhost:4747/${getUser.photo}`",
            width="35",
            height="35"
          )
          span.text-white.font-medium {{ getUser.username }}
        button.pointer.text-purple-900.ml-5.px-5.h-8.font-medium.rounded-full.outline-none.logout-button(@click="logout") Logout
      .flex.items-center(v-else)
        nuxt-link.text-purple-300.font-medium(class='hover:text-purple-100', to='/auth/login') Login
        nuxt-link.text-purple-300.font-medium.ml-5(class='hover:text-purple-100', to='/auth/register') Register
</template>

<script>
export default {
  computed: {
    isAuth() {
      const isAuth = this.$store.getters['auth/GET_AUTH']
      return isAuth.signedIn
    },
    getUser() {
      return this.$store.getters['auth/GET_AUTH'].user
    }
  },
  methods: {
    async logout() {
      await this.$apolloHelpers.onLogout()
      await this.$store.dispatch('auth/SET_AUTH', {
        signedIn: false,
        user: null
      })

      this.$router.push('/')
    }
  }
}
</script>
