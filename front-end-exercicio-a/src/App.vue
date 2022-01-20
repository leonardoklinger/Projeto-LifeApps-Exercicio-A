<template>
  <div id="nav">
    <NavBar/>
  </div>
  <router-view/>
</template>

<script>
import NavBar from './components/navbar.vue'
export default {
  components: {
    NavBar
  }
}
</script>