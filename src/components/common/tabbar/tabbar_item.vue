<template>
  <div class="tabbar_item" @click="btnClick()">
    <div v-if="!isActive"><slot name="tabbar_icon"></slot></div>
    <div v-else><slot name="tabbar_icon_active"></slot></div>
    <div :style="clickColors"><slot name="tabbar_text"></slot></div>
  </div>
</template>

<script>
export default {
  name: "tabbar_item",
  data () {
    return {
    };
  },
  props: {
    path:String,
    clickColor:{
      type: String,
      default: 'red'
    }
  },
  methods: {
    btnClick(){
      this.$router.replace(this.path).catch(err => {});
    },
  },
  computed: {
    isActive(){
      return this.$route.path == this.path;
    },
    clickColors(){
      return this.isActive ? {color: this.clickColor} : {};
    }
  }
}
</script>

<style scoped>
  .tabbar_item{
    flex: 1;
    font-size: 14px;
    height: 49px;
    font-weight: 500;
    text-align: center;
  }
  
  .tabbar_item img{
    width: 24px;
    margin-top: 3px;
    margin-bottom: 2px;
    vertical-align: middle;
  }
</style>