<script>
export default {
  name: 'ItemsDumb',

  props: {
    items: { type: Array, required: true }
  },

  methods: {
    deleteItem (id) {
      this.$emit('deleteItem', id)
    }
  }
}
</script>

<template>
  <v-row no-gutters>
    <v-col v-for='(item, i) in items' :key='i' :cols='4'>
      <v-card
        class='ma-3 pa-6'
        outlined
        tile
      >
        <v-list-item>
          <v-list-item-content>
            {{ item.name }}
          </v-list-item-content>
        </v-list-item>

        <v-card-actions>
          <v-btn class='error' @click='deleteItem(item.id)'>Delete</v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>
