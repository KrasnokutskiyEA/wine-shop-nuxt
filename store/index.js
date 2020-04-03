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
  ADD_ITEMS_DATA_INIT (state, doc) {
    state.recievedItems = [...state.recievedItems, ...[doc]]
  },

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
  nuxtServerInit ({ dispatch }) {
    // eslint-disable-next-line
    // console.log('------Starting App-----this=', this)
  },

  async getItems ({ commit, getters }) {
    try {
      const res = await this.$fireStore.collection('products').get()
      res.forEach(doc => commit('ADD_ITEMS_DATA_INIT', { id: doc.id, ...doc.data() }))
      !getters.initItems && commit('SET_INIT_ITEMS')
    } catch (e) {
      // eslint-disable-next-line
      console.log('error=', e)
    }
  },

  listenItems ({ commit, getters }, res) {
    res.docChanges().forEach((change) => {
      const doc = { ...change.doc.data(), id: change.doc.id }

      switch (change.type) {
        case 'added': return getters.initItems && commit('ADD_ITEMS_DATA', doc)
        case 'modified': return commit('MODIFY_ITEMS_DATA', doc)
        case 'removed': return commit('REMOVE_ITEMS_DATA', doc)
      }
    })
  },

  async addItem ({ commit, getters }, itemName) {
    try {
      const item = { name: itemName }
      await this.$fireStore.collection('products').add(item)
    } catch (e) {
      // eslint-disable-next-line
      console.log('error=', e)
    }
  },

  async deleteItem ({ commit, getters }, id) {
    try {
      await this.$fireStore.collection('products').doc(id).delete()
    } catch (e) {
      // eslint-disable-next-line
      console.log('error=', e)
    }
  }
}
