<template>
  <b-navbar v-if="scrollTop" style="background-color: transparent !important;">
    <b-container>
      <b-navbar-brand>
        <router-link to="/week01"><img alt="Vue logo" src="@/assets/week01/icon_logo.png"></router-link>
      </b-navbar-brand>
    </b-container>
  </b-navbar>
  <b-navbar v-else toggleable="sm" type="light" variant="light">
    <b-container>
      <b-navbar-brand>
        <router-link to="/week01"><img alt="Vue logo" src="@/assets/week01/blue_icon_logo.png"></router-link>
      </b-navbar-brand>
    </b-container>
  </b-navbar>
</template>

<script>

export default {
  data() {
    return {
      scrollTop: true,
      navClass: "",
      src: require('@/assets/week01/icon_logo.png')
    }
  },
  created() {
    window.addEventListener("scroll", this.scroll);
  },
  methods: {
    scroll(){
      if (window.scrollY > 1) {
        this.scrollTop = false
      } else {
        this.scrollTop = true
      }
    }
  }
}
</script>
<style scoped>
nav {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  z-index: 2;
}
</style>