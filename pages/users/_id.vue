<script>
export default {
  validate ({ params }) {
    // Must be a number
    return /^\d+$/.test(params.id)
  }
}
</script>

<template>
  <section>
    <h1>User {{ $route.params.id }}</h1>
  </section>
</template>
