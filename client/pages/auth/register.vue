<template lang="pug">
  div
    PageCard(:spinner="spinner")
      template(v-slot:header)
        span.font-weight-bold.text-black-50 Register Page
      
      template(v-slot:body)
        Alert(:content="{ group: 'static', closeOnClick: false, width: '100%', max: 1, style: 'position: static;'}")
        
        ValidationObserver(v-slot="{ invalid, handleSubmit }")
          form(@submit.prevent="handleSubmit(onSubmit)", novalidate)
            Input(
              v-model="form.inputUsername",
              rules="required|min:3",
              id="inputUsername",
              type="text",
              labelText="Username"
            )
            Input(
              v-model="form.inputEmail",
              rules="required|email|min:6",
              id="inputEmail",
              type="email",
              labelText="Email"
            )
            Input(
              v-model="form.inputPassword",
              rules="required|min:6",
              id="inputPassword",
              type="password",
              labelText="Password",
              vid="passwordConfirmation"
            )
            Input(
              v-model="form.inputPasswordConfirmation",
              rules="confirmed:passwordConfirmation|required|min:6",
              id="inputPasswordConfirmation",
              type="password",
              labelText="Password Confirmation"
            )

            button.btn.btn-primary(:disabled="invalid") Sign up
    
    hr
    small
      | Already have an account? 
      nuxt-link(to="/auth/login") Sign in!
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
  components: { ValidationObserver, PageCard, Alert, Input, Spinner },
  head: {
    title: 'Register'
  },
  mounted() {
    /* setTimeout(() => {
      this.spinner = true
    }, 3000)

    setTimeout(() => {
      this.spinner = false
    }, 6000) */
  },
  data() {
    return {
      form: {
        inputUsername: 'yunus',
        inputEmail: 'yunus@gmail.com',
        inputPassword: '123456',
        inputPasswordConfirmation: '123456'
      },
      spinner: false
    }
  },
  methods: {
    async onSubmit() {
      try {
        this.spinner = true

        await this.$apollo.mutate({
          mutation: userMutation.signUp,
          variables: {
            email: this.form.inputEmail,
            username: this.form.inputUsername,
            password: this.form.inputPassword
          }
        })

        this.$notify({
          group: 'fixed',
          type: 'success',
          title: 'Success!',
          text: 'Successfuly signed up. Check your email.',
          duration: 5000
        })

        this.spinner = false
      } catch (error) {
        this.spinner = false

        console.log(error)
        if (error.graphQLErrors) {
          error.graphQLErrors.forEach(errorItem => {
            this.$notify({
              group: 'static',
              type: 'error',
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
