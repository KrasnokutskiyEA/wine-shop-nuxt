export default function ({ store, redirect }) {
  if (!store.getters['main/hasToken']) {
    redirect('/login?message=login')
  }
}
