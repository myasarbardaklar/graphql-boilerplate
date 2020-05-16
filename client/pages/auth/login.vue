<template lang="pug">
  div
    PageCard(:spinner="spinner")
      template(v-slot:header)
        span.font-weight-bold.text-black-50 Login Page
      
      template(v-slot:body)
        Alert(:content="{ group: 'static', closeOnClick: false, width: '100%', max: 1, style: 'position: static;'}")
        
        ValidationObserver(v-slot="{ invalid, handleSubmit }")
          form(@submit.prevent="handleSubmit(onSubmit)", novalidate)
            Input(
              v-model="form.inputUsername",
              rules="required|min:3",
              id="inputUsername",
              type="username",
              labelText="Username"
            )
            Input(
              v-model="form.inputPassword",
              rules="required|min:6",
              id="inputPassword",
              type="password",
              labelText="Password"
            )

            button.btn.btn-primary(:disabled="invalid") Sign in
    
    hr
    small
      | Need an account? 
      nuxt-link(to="/auth/register") Sign up now!
</template>

<script>
// plugins
import { ValidationObserver } from 'vee-validate'

// partials
import PageCard from '@partials/PageCard.vue'

// components
import Alert from '@components/Alert.vue'
import Input from '@components/Input.vue'
import Spinner from '@components/Spinner.vue'

// graphql files
import userMutation from '@/gql/user.gql'

export default {
  components: { ValidationObserver, PageCard, Alert, Input },
  head: {
    title: 'Login'
  },
  mounted() {
    if (this.$route.query.verification_token) {
      this.modal = true
    }
  },
  data() {
    return {
      form: {
        inputUsername: 'yasar',
        inputPassword: '123456'
      },
      spinner: false,
      modal: false
    }
  },
  methods: {
    async onSubmit() {
      try {
        this.$nuxt.$loading.start()

        const response = await this.$apollo.mutate({
          mutation: userMutation.signIn,
          variables: {
            username: this.form.inputUsername,
            password: this.form.inputPassword
          }
        })
        await this.$apolloHelpers.onLogin(response.data.signIn.token)
        await this.$store.dispatch('auth/SET_AUTH', {
          signedIn: true,
          user: response.data.signIn.user
        })

        this.$notify({
          group: 'fixed',
          type: 'success',
          title: 'Success!',
          text: 'Successfuly signed in.',
          duration: 5000
        })
        this.$router.push('/')

        this.$nuxt.$loading.finish()
      } catch (error) {
        this.$nuxt.$loading.finish()

        console.log(error)
        if (error.graphQLErrors) {
          error.graphQLErrors.forEach(errorItem => {
            this.$notify({
              group: 'static',
              type: 'danger',
              title: errorItem.extensions.errorTitle,
              text: errorItem.message,
              duration: -1
            })
          })
        }
      }
    }
  }
}
</script>
