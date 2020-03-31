<script>
import { mapGetters, mapActions } from 'vuex'
import ItemsDumb from '../components/ItemsDumb'

export default {
  name: 'Items',

  components: {
    ItemsDumb
  },

  data: () => ({
    itemName: ''
  }),

  computed: {
    ...mapGetters([
      'recievedItems',
      'initItems'
    ])
  },

  mounted () {
    // eslint-disable-next-line
    this.$fireStore.collection('products').onSnapshot(res => this.getItems(res))
  },

  methods: {
    ...mapActions([
      'getItems'
    ]),

    deleteItem (id) {
      this.$fireStore.collection('products').doc(id).delete()
    },

    addItem (itemName) {
      const item = {
        name: itemName
      }
      this.$fireStore.collection('products').add(item).then((res) => {})
    }
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
