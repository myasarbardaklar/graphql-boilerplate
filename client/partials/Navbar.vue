<template lang="pug">
  nav.navbar.navbar-expand-lg.navbar-dark.bg-dark
    .container
      nuxt-link.navbar-brand(to="/")
        img.d-inline-block.align-top(
          src="https://getbootstrap.com/docs/4.4/assets/brand/bootstrap-solid.svg",
          width="30",
          height="30",
          alt=""
        )
        |  Bootstrap
      .collapse.navbar-collapse
        ul.navbar-nav
          li.nav-item
            nuxt-link.nav-link(to="/") Home
          li.nav-item
            nuxt-link.nav-link(to="/about") About
      ul.navbar-nav(v-if="!isAuth")
        li.nav-item
          nuxt-link.nav-link(to="/auth/login") Login
        li.nav-item
          nuxt-link.nav-link(to="/auth/register") Register
      ul.navbar-nav(v-else)
        li.nav-item
          nuxt-link.nav-link(to="/")
            img.rounded-circle.mr-2(
              :src="`http://localhost:4747/${getUser.photo}`",
              width="20",
              height="20"
            )
            span {{ getUser.username }}
        li.nav-item
          a.nav-link(href="#", @click="logout") Logout
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
    async logout(e) {
      e.preventDefault()

      this.$nuxt.$loading.start()
      await this.$apolloHelpers.onLogout()
      await this.$store.dispatch('auth/SET_AUTH', {
        signedIn: false,
        user: null
      })

      this.$notify({
        group: 'fixed',
        type: 'success',
        title: 'Success!',
        text: 'Successfuly signed out.',
        duration: 5000
      })

      this.$router.push('/')
      this.$nuxt.$loading.finish()
    }
  }
}
</script>
