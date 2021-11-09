<template>
  <b-container id="app">
    <NavBar />

    <router-view/>

  </b-container>
</template>

<script>
import NavBar from '@/components/Week01/NavBar'

export default {
  name: 'Layout',
  components: {
    NavBar,
  }
}
</script>