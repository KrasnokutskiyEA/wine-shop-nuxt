<script>
export default {
  async fetch ({ store }) {
    if (store.getters['users/users'].length === 0) {
      await store.dispatch('users/fetchUsers')
    }
  },

  data: () => ({
    pageTitle: 'Users page'
  }),

  computed: {
    users () {
      return this.$store.getters['users/users']
    }
  },

  methods: {
    openUser (user) {
      this.$router.push('/users/' + user)
    }
  }
}
</script>

<template>
  <section>
    <h1>{{ pageTitle }}</h1>

    <ul>
      <li v-for='user of users' :key='user.id'>
        <a href='#' @click.prevent='openUser(user.id)'>{{ user.name }}</a>
      </li>
    </ul>
  </section>
</template>
