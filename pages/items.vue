<script>
import { mapActions } from 'vuex'

export default {
  name: 'Items',

  mounted () {
    // eslint-disable-next-line
    this.$fireStore.collection('products').onSnapshot(res => this.getItems(res))
  },

  methods: {
    ...mapActions('items', [
      'getItems'
    ])
  }
}
</script>

<template>
  <h1>This is Items Page!</h1>
</template>
