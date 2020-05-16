// graphql files
import userMutation from '@/gql/user.gql'

export default {
  actions: {
    async nuxtServerInit(store, ctx) {
      try {
        const token = await ctx.app.$apolloHelpers.getToken()

        if (token) {
          const response = await ctx.app.apolloProvider.defaultClient.mutate({
            mutation: userMutation.signedUser,
            variables: { token }
          })

          if (response) {
            await store.dispatch('auth/SET_AUTH', {
              signedIn: true,
              user: response.data.signedUser.user
            })
          }
        } else {
          await store.dispatch('auth/SET_AUTH', {
            signedIn: false,
            user: null
          })
        }
      } catch (error) {
        console.log(error)
      }
    }
  }
}
