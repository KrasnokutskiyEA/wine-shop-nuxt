<script>
export default {
  methods: {
    openUser (user) {
      this.$router.push('/users/' + user)
    }
  }
}
</script>

<template>
  <section>
    <h1>This is Users Page!</h1>

    <ul>
      <li v-for='(user, i) of 5' :key='i'>
        <a href='#' @click.prevent='openUser(user)'>
          User {{ user }}
        </a>
      </li>
    </ul>
  </section>
</template>
