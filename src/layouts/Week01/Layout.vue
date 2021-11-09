<template>
  <div id="app">
    <b-container>
    <NavBar />

    <router-view/>

    </b-container>
    <Footer />
  </div>
</template>

<script>
import NavBar from '@/components/Week01/NavBar'
import Footer from '@/components/Week01/Footer'

export default {
  name: 'Layout',
  components: {
    NavBar,
    Footer,
  }
}
</script>

<style scoped>
#app {
  background: #F1F1F1 0% 0% no-repeat padding-box !important;
}
</style>