<template>
  <div class="tab-control">
    <div v-for="(item,id) in titles" 
        class="tab-control-item" 
        :key="id" 
        :class="{active:id === currentIndex}" 
        @click="itemClick(id)">
      <span>{{item}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "TabControl",
  data () {
    return {
      currentIndex: 0,
    };
  },
  props: {
    titles: {
      type: Array,
      default(){
        return []
      }
    }
  },
  methods: {
    itemClick(id){
      this.currentIndex = id;
      this.$emit('tabclick', id);
    }
  }
}
</script>

<style scoped>
  .tab-control {
    display: flex;
    text-align: center;
    background-color: #fff;
    z-index: 9;
  }
  .tab-control-item {
    flex: 1;
    height: 40px;
    line-height: 40px;
  }
  .active {
    color: var(--color-high-text);
  }
  .active span{
    padding: 5px;
    border-bottom: 2px solid var(--color-tint);
  }
</style>