<template>
  <div class="tab-bar">
    <slot></slot>
  </div>
</template>

<script>

export default {
  name: "tabbar",
  data () {
    return {

    };
  }
}
</script>

<style scoped>
  .tab-bar {
    display: flex;
    background-color:#f6f6f6;
    position: fixed;
    bottom: 0;
    right: 0;
    left: 0;
    z-index: 10;
  }
</style>