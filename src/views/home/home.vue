<template>
  <div id="home">
    <navbar class="home_nav">
      <div slot="center" >购物街</div>
    </navbar>

    <home-swiper :banners="banners"></home-swiper>
    <home-recommend :recommends="recommend"></home-recommend>

    <featrueview></featrueview>

    <tab-control :titles = "['流行','新款','精选']" 
      class="tab-control" 
      @tabclick='tabclick'
    ></tab-control>

    <goods-list :goods = "showGoods"></goods-list>
  </div>
</template>

<script>
import HomeSwiper from './childComps/HomeSwiper'
import HomeRecommend from './childComps/HomeRecommend.vue'
import Featrueview from './childComps/FeatrueView.vue'

import navbar from 'components/common/navbar/navbar.vue'
import TabControl from 'components/content/tabControl/TabControl.vue'
import GoodsList from 'components/content/goods/GoodsList.vue'

import {getHomeMultidata, getHomeGoods} from 'network/home.js'

export default {
  name: "home",
  data () {
    return {
      banners: [],
      recommend: [],
      goods:{
        'pop': {page: 0, list: []},
        'new': {page:0, list: []},
        'sell': {page:0, list: []}
      },
      currentType: 'pop'
    };
  },
  components: {
    navbar,
    HomeSwiper,
    HomeRecommend,
    Featrueview,
    TabControl,
    GoodsList,
  },
  created(){
    this.getHomeMultidata();
    this.getHomeGoods('pop');
    this.getHomeGoods('new');
    this.getHomeGoods('sell');
  },
  methods: {
    getHomeMultidata() {
      getHomeMultidata().then( res => {
        this.banners = res.data.banner.list;
        this.recommend = res.data.recommend.list;
      })
    },
    getHomeGoods(type){
      const page = this.goods[type].page + 1;
      getHomeGoods(type, page).then( res => {
        this.goods[type].list.push(...res.data.list);
        this.goods[type].page += 1
      })
    },


    tabclick(index){
      switch (index) {
        case 0:
          this.currentType = 'pop';
          break;
        case 1:
          this.currentType = 'new';
          break;
        case 2:
          this.currentType = 'sell';
      }
    }

  },
  computed: {
    showGoods(){
      return this.goods[this.currentType].list;
    }
  }
  
}
</script>

<style scoped>
#home{
  height: 2000px;
  padding-top: 44px;
}

  .home_nav {
    background-color: var(--color-tint);
    color: white;
    /* position: sticky;
    top: 0;
    z-index: 9; */
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    z-index: 9;

  }

  .tab-control {
    position: sticky;
    top: 44px;
  }
</style>