<template>
  <div>
    <tabbar>
    <tabbar-item path='/home' clickColor="deeppink">
      <img src="~assets/img/tabbar/home.svg" alt="" slot="tabbar_icon">
      <img src="~assets/img/tabbar/home_active.svg" alt="" slot="tabbar_icon_active">
      <div slot="tabbar_text">首页</div>
    </tabbar-item>
    <tabbar-item path='/category' clickColor="deeppink">
      <img src="~assets/img/tabbar/category.svg" alt="" slot="tabbar_icon">
      <img src="~assets/img/tabbar/category_active.svg" alt="" slot="tabbar_icon_active">
      <div slot="tabbar_text">分类</div>
    </tabbar-item>
    <tabbar-item path='/shopcart' clickColor="deeppink">
      <img src="~assets/img/tabbar/shopcart.svg" alt="" slot="tabbar_icon">
      <img src="~assets/img/tabbar/shopcart_active.svg" alt="" slot="tabbar_icon_active">
      <div slot="tabbar_text">购物车</div>
    </tabbar-item>
    <tabbar-item path='/profile' clickColor="deeppink">
      <img src="~assets/img/tabbar/profile.svg" alt="" slot="tabbar_icon">
      <img src="~assets/img/tabbar/profile_active.svg" alt="" slot="tabbar_icon_active">
      <div slot="tabbar_text">我的</div>
    </tabbar-item>
   </tabbar>
  </div>
</template>

<script>

import tabbar from 'components/common/tabbar/tabbar.vue'
import tabbarItem from 'components/common/tabbar/tabbar_item.vue'

export default {
  name: "mainTabbar",
  data () {
    return {

    };
  },
  components:{
    tabbar,
    tabbarItem
  }
}
</script>

<style scoped>

</style>