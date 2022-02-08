<template>
  <div id="home">
    <navbar class="home_nav">
      <div slot="center" >购物街</div>
    </navbar>
    <tab-control :titles = "['流行','新款','精选']" 
                    class="tab-control" 
                    @tabclick='tabclick'
                    ref="tabControl2"
                    v-show='isTabFixed'>
      </tab-control>
    <scroll class="content" 
            ref="scroll" 
            :probe-type="3" 
            @scroll = 'contentScroll' 
            :pull-up-load="true"
            @pullingUp = 'pullingUp'>
      <home-swiper :banners="banners" @swiperImageLoad = 'swiperImageLoad'></home-swiper>
      <home-recommend :recommends="recommend"></home-recommend>

      <featrueview></featrueview>

      <tab-control :titles = "['流行','新款','精选']" 
                    class="tab-control" 
                    @tabclick='tabclick'
                    ref="tabControl1">
      </tab-control>

      <goods-list :goods = "showGoods"></goods-list>
    </scroll>
    
    <back-top @click.native = 'btnClick' v-show="isShowBackTop"></back-top> 

  </div>
</template>

<script>
import HomeSwiper from './childComps/HomeSwiper'
import HomeRecommend from './childComps/HomeRecommend.vue'
import Featrueview from './childComps/FeatrueView.vue'

import navbar from 'components/common/navbar/navbar.vue'
import TabControl from 'components/content/tabControl/TabControl.vue'
import GoodsList from 'components/content/goods/GoodsList.vue'
import Scroll from 'components/common/scroll/Scroll.vue'
import backTop from 'components/content/backTop/backTop.vue'

import {getHomeMultidata, getHomeGoods} from 'network/home.js'
import {debounce} from 'common/utils.js'
import {itemListenerMixin} from 'common/mixin.js'

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
      currentType: 'pop',
      isShowBackTop: false,
      tabOffsetTop: 0,
      isTabFixed: false,
      saveY: 0,
      // itemListener: null
    };
  },
  mixins: [itemListenerMixin],
  components: {
    navbar,
    HomeSwiper,
    HomeRecommend,
    Featrueview,
    TabControl,
    GoodsList,
    Scroll,
    backTop,
  },
  // created中尽量不要写和dom有关的操作
  created(){
    this.getHomeMultidata();
    this.getHomeGoods('pop');
    this.getHomeGoods('new');
    this.getHomeGoods('sell');
  },
  mounted(){
    // const newRefresh = debounce(this.$refs.scroll.refresh, 500)
    // this.itemListener = () => newRefresh();
    // this.$bus.$on('itemImageLoad', this.itemListener
      // 用来解决下拉刷新卡顿，因为better-scroll在创建后会计算我们的可以下拉的高度
      // 而我们图片的请求是异步的，而图片的高度没有被及时计算到可以下拉的高度中，如果图片加载很快，那就会被加进去
      // 所以会出现卡顿，refresh可以让better-scroll再一次进行刷新，获取图片加载好了的高度

      // 使用this.$refs.scroll && 是为了确保调用的时候scroll组件和数据已经加载好了
      // this.$refs.scroll && this.$refs.scroll.refresh();

      // 防抖
      // newRefresh();
    // )
  },
  // 有keep-alive缓存的情况下可以使用这两个函数
  activated(){
    this.$refs.scroll.scrollTo(0, this.saveY, 10);
    this.$refs.scroll.refresh();
  },
  deactivated(){
    this.saveY = this.$refs.scroll.getScrollY();
    // console.log(this.saveY);

    // 第二个为监听的函数，如果不传，就会把所有监听取消
    this.$bus.$off('itemImgLoad', this.itemListener);
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

        this.$refs.scroll.finishPullUp()
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
      this.$refs.tabControl1.currentIndex = index;
      this.$refs.tabControl2.currentIndex = index;
    },
    btnClick(){
      this.$refs.scroll.scrollTo(0, 0, 500);
    },
    contentScroll(position){
      this.isShowBackTop = -position.y > 950;
      this.isTabFixed = (-position.y) > this.tabOffsetTop
    },
    pullingUp(){
      this.getHomeGoods(this.currentType);
    },
    swiperImageLoad(){
      // 用来解决tabControl的吸顶问题
      // 先要获取tabControl的offsetTop
      // 所有的组件都有一个属性$el,用来获取组件中的元素
      this.tabOffsetTop = this.$refs.tabControl1.$el.offsetTop;

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
  height: 100vh;
  padding-top: 44px;
  position: relative;
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
    position: relative;
    z-index: 9;
  }
  /* .tab-control {
    position: sticky;
    top: 44px;
  } */

  .content {
    /* height: 300px; */
    overflow: hidden;
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }

  /* .content {
    height: 100%;
    overflow: hidden;
  } */
</style>