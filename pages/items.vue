<script>
import { mapGetters, mapActions } from 'vuex'
import ItemsDumb from '../components/ItemsDumb'

export default {
  name: 'Items',

  components: {
    ItemsDumb
  },

  // async fetch ({ store }) {
  //   if (store.getters.products.length === 0) {
  //     this.$fireStore.collection('products').onSnapshot(res => store.dispatch(getItems(res)))
  //   }
  // },

  data () {
    return {
      itemName: ''
    }
  },

  computed: {
    ...mapGetters([
      'recievedItems',
      'initItems'
    ])
  },

  created () {
    this.$fireStore.collection('products').onSnapshot(res => this.listenItems(res))
  },

  mounted () {
    this.getItems()
  },

  methods: {
    ...mapActions([
      'getItems',
      'listenItems',
      'addItem',
      'deleteItem'
    ])
  }
}
</script>

<template>
  <div>
    <v-row no-gutters>
      <v-col cols='2'>
        <v-text-field
          v-model='itemName'
          label='Item name'
          class='mx-4'
        />
      </v-col>

      <v-col cols='1'>
        <v-btn
          class='primary mt-4'
          :disabled='itemName === ""'
          @click='addItem(itemName)'
        >
          Add Item
        </v-btn>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols='4'>
        <div v-if='!initItems'>Initializing...</div>

        <ItemsDumb
          v-else
          :items='recievedItems'
          @deleteItem='deleteItem'
        />
      </v-col>
    </v-row>
  </div>
</template>
