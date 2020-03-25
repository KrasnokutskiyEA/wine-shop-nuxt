<script>
export default {
  validate ({ params }) {
    // Must be a number
    return /^\d+$/.test(params.id)
  },
  async asyncData ({ $axios, params }) {
    const user = await $axios.$get('https://jsonplaceholder.typicode.com/users/' + params.id)
    return { user }
  }
}
</script>

<template>
  <section>
    <h2>User {{ user.name }}</h2>

    <hr>

    <h2>User {{ user.email }}</h2>
  </section>
</template>
