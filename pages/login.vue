<script>
import { mapActions } from 'vuex'

export default {
  layout: 'empty',

  methods: {
    ...mapActions('main', [
      'login'
    ]),

    tryLogin () {
      this.login()
      this.$router.push('/')
    }
  }
}
</script>

<template>
  <section>
    <v-alert v-if='$route.query.message'>Need Login first!</v-alert>

    <h1>This is Login Page!</h1>
    <h1>Enter your credentials, please...</h1>

    <p>
      <nuxt-link to='/'>To Home Page...</nuxt-link>
    </p>

    <v-btn @click='tryLogin'>Login</v-btn>
  </section>
</template>
