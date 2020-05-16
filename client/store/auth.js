export default {
  state() {
    return {
      signedIn: false,
      user: null
    }
  },

  getters: {
    GET_AUTH(state) {
      return { signedIn: state.signedIn, user: state.user }
    }
  },

  mutations: {
    SET_AUTH(state, payload) {
      state.signedIn = payload.signedIn
      state.user = payload.user
    }
  },

  actions: {
    SET_AUTH({ commit }, payload) {
      commit('SET_AUTH', payload)
    }
  }
}
