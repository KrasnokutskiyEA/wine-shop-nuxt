import Vue from 'vue'

export const state = () => ({
  recievedItems: [],
  initItems: false
})

export const getters = {
  recievedItems: state => state.recievedItems,
  initItems: state => state.initItems
}

export const mutations = {
  ADD_ITEMS_DATA (state, doc) {
    !state.recievedItems.some(i => i.id === doc.id) &&
    state.recievedItems.push(doc)
  },

  MODIFY_ITEMS_DATA (state, doc) {
    const i = state.recievedItems.findIndex(i => i.id === doc.id)
    Vue.set(state.recievedItems, i, doc)
  },

  REMOVE_ITEMS_DATA (state, doc) {
    state.recievedItems = state.recievedItems.filter(i => i.id !== doc.id)
  },

  SET_INIT_ITEMS (state) {
    Vue.set(state, 'initItems', true)
  }
}

export const actions = {
  async getItems ({ commit, getters }, res) {
    // eslint-disable-next-line
    await res.docChanges().forEach(change => {
      const doc = { ...change.doc.data(), id: change.doc.id }

      // forming data array
      switch (change.type) {
        case 'added':
          commit('ADD_ITEMS_DATA', doc)
          break
        case 'modified':
          commit('MODIFY_ITEMS_DATA', doc)
          break
        case 'removed':
          commit('REMOVE_ITEMS_DATA', doc)
          break
        default:
          break
      }

      !getters.init && commit('SET_INIT_ITEMS')
    })
  }
}
