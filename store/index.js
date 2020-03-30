export const state = () => ({
  token: null
})

export const getters = {
  hasToken: state => !!state.token
}

export const mutations = {
  SET_TOKEN (state, token) {
    state.token = token
  },

  RESET_TOKEN (state) {
    state.token = null
  }
}

export const actions = {
  nuxtServerInit ({ dispatch }) {
    // eslint-disable-next-line
    console.log('------Starting App-----')
  },

  login ({ commit }) {
    commit('SET_TOKEN', 'truetoken')
  },

  logout ({ commit }) {
    commit('RESET_TOKEN')
  }
}
