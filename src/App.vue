<template>
  <div id="app">
    <keep-alive exclude="detail">
      <!-- exclude中属性写的是组件的name -->
      <router-view></router-view>
    </keep-alive>
   <mainTabbar v-if="$route.meta.footShow"></mainTabbar>
  </div>
</template>

<script>

import mainTabbar from 'components/content/mainTabbar.vue'

export default {
  name: 'App',
  components: {
    mainTabbar
  }
}
</script>

<style>
  @import 'assets/css/base.css';
</style>
