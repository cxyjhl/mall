<template>
  <div>
    <navbar class="home_nav">
      <div slot="center" >购物街</div>
    </navbar>

    <home-swiper :banners="banners"></home-swiper>
    <home-recommend :recommends="recommend"></home-recommend>
  </div>
</template>

<script>

import navbar from 'components/common/navbar/navbar.vue'
import {getHomeMultidata} from 'network/home.js'
import HomeSwiper from './childComps/HomeSwiper'
import HomeRecommend from './childComps/HomeRecommend.vue'

export default {
  name: "home",
  data () {
    return {
      banners: [],
      recommend: []
    };
  },
  components: {
    navbar,
    HomeSwiper,
    HomeRecommend
  },
  created(){
    getHomeMultidata().then( res => {
      this.banners = res.data.banner.list;
      this.recommend = res.data.recommend.list;
    })
  }
}
</script>

<style scoped>
  .home_nav {
    background-color: var(--color-tint);
    color: white;

  }
</style>