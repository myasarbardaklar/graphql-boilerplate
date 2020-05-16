import { redirectNotify } from '~/helpers'

// graphql files
import userMutation from '@/gql/user.gql'

export default async function(ctx) {
  try {
    const token = await ctx.app.$apolloHelpers.getToken()

    if (token) {
      const response = await ctx.app.apolloProvider.defaultClient.mutate({
        mutation: userMutation.signedUser,
        variables: { token }
      })
    } else {
      ctx.store.dispatch('auth/SET_AUTH', {
        signedIn: false,
        user: null
      })

      return redirectNotify(
        '/auth/login',
        {
          group: 'fixed',
          type: 'danger',
          title: 'You are not authenticated.',
          text: 'Please sign in and try to access this page again.',
          duration: 5000
        },
        ctx
      )
    }
  } catch (error) {
    console.log(error)

    if (error.graphQLErrors[0]) {
      return redirectNotify(
        '/auth/login',
        {
          group: 'fixed',
          type: 'danger',
          title: error.graphQLErrors[0].extensions.errorTitle,
          text: error.graphQLErrors[0].message,
          duration: 5000
        },
        ctx
      )
    }
  }
}
